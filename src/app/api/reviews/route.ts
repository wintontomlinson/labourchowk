import { NextResponse } from "next/server";
import { createReview } from "@/lib/db";

/** POST /api/reviews — submit a review for a worker (persists to DB). */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rating = Number(body.rating);
    if (!body.workerId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "workerId and a 1–5 rating are required" }, { status: 400 });
    }
    const review = await createReview({
      workerId: body.workerId,
      customerName: (body.customerName || "Anonymous").toString().slice(0, 60),
      customerCity: (body.customerCity || "").toString().slice(0, 60),
      rating: Math.round(rating),
      text: (body.text || "").toString().slice(0, 1000),
      service: (body.service || "Service").toString().slice(0, 60),
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
  }
}
