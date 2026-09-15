import { NextResponse } from "next/server";
import { createContactMessage } from "@/lib/db";

/** POST /api/contact — store a contact/support message. */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.message) {
      return NextResponse.json({ error: "name and message are required" }, { status: 400 });
    }
    const ok = await createContactMessage({
      name: body.name.toString().slice(0, 80),
      phone: body.phone?.toString().slice(0, 20),
      email: body.email?.toString().slice(0, 120),
      message: body.message.toString().slice(0, 2000),
    });
    return NextResponse.json({ ok }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
