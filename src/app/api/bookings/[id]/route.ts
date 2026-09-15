import { NextResponse } from "next/server";
import { updateBookingStatus } from "@/lib/db";
import type { BookingStatus } from "@/lib/types";

const VALID: BookingStatus[] = [
  "pending",
  "accepted",
  "confirmed",
  "on_the_way",
  "in_progress",
  "completed",
  "cancelled",
];

/** PATCH /api/bookings/[id] — update a booking's status (admin/worker). */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    if (!VALID.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    const ok = await updateBookingStatus(id, body.status);
    return NextResponse.json({ ok, id, status: body.status });
  } catch {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
