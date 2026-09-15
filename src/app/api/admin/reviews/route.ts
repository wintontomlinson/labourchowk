import { NextResponse } from "next/server";
import { updateReviewStatus } from "@/lib/db";

const VALID = ["published", "flagged", "hidden"] as const;

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
