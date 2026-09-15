import { NextResponse } from "next/server";
import { createBooking } from "@/lib/db";
import { generateBookingId } from "@/data/bookings";
import type { Booking } from "@/lib/types";

/**
 * POST /api/bookings — create a booking.
 * Persists to PostgreSQL when DATABASE_URL is configured, otherwise echoes the
 * created booking back (demo mode). Returns the booking with its generated ID.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Minimal server-side validation.
    const required = ["workerId", "service", "date", "timeSlot", "address", "city"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const booking: Booking = {
      id: generateBookingId(),
      workerId: body.workerId,
      workerName: body.workerName ?? "",
      workerPhoto: body.workerPhoto ?? "",
      service: body.service,
      customerName: body.customerName ?? "Guest",
      status: "pending",
      date: body.date,
      timeSlot: body.timeSlot,
      address: body.address,
      city: body.city,
      estimatedPrice: Number(body.estimatedPrice) || 0,
      priceModel: body.priceModel ?? "visit",
      createdAt: new Date().toISOString(),
      notes: body.notes,
    };

    const saved = await createBooking(booking);
    return NextResponse.json({ booking: saved }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
