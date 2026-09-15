import { NextResponse } from "next/server";
import { updateReviewStatus, getAllReviews } from "@/lib/db";

export const dynamic = "force-dynamic";

const VALID = ["published", "flagged", "hidden"] as const;

/** GET /api/admin/reviews — all reviews for moderation. */
export async function GET() {
  try {
    const reviews = await getAllReviews();
    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 });
  }
}

/** PATCH /api/admin/reviews — moderate a review (publish/hide/flag). */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    if (!body.reviewId || !VALID.includes(body.status)) {
      return NextResponse.json({ error: "reviewId and a valid status are required" }, { status: 400 });
    }
    const ok = await updateReviewStatus(body.reviewId, body.status);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ error: "Failed to moderate review" }, { status: 500 });
  }
}
