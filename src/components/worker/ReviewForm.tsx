"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

/**
 * Write-a-review form on a worker profile. Posts to /api/reviews which persists
 * to the database and recomputes the worker's rating, then refreshes the page
 * so the new review shows immediately.
 */
export function ReviewForm({
  workerId,
  service,
}: {
  workerId: string;
  service: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!rating) {
      toast("Please select a rating", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workerId,
          rating,
          text,
          service,
          customerName: name || "Anonymous",
          customerCity: city,
        }),
      });
      if (!res.ok) throw new Error();
      toast("Review submitted — thank you!", "success");
      setOpen(false);
      setRating(0);
      setName("");
      setCity("");
      setText("");
      router.refresh(); // re-fetch server component → new review appears
    } catch {
      toast("Couldn't submit review. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-outline btn-sm">
        <Icon name="star" size={15} />
        Write a review
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-ink/10 bg-ivory-50 p-4">
      <p className="mb-2 text-sm font-semibold text-ink">Rate this worker</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="p-0.5"
            aria-label={`${n} star`}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" className={cn((hover || rating) >= n ? "text-amber-500" : "text-ink/20")}>
              <path
                fill="currentColor"
                d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"
              />
            </svg>
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="input"
        />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Your city"
          className="input"
        />
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="Share your experience (optional)"
        className="input mt-2.5 h-auto py-2.5 leading-relaxed"
      />
      <div className="mt-3 flex items-center gap-2">
        <button onClick={submit} disabled={submitting} className="btn-primary btn-sm">
          {submitting ? "Submitting…" : "Submit review"}
        </button>
        <button onClick={() => setOpen(false)} className="btn-ghost btn-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
