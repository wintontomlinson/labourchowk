import { NextResponse } from "next/server";
import { createWorker } from "@/lib/db";
import { getService } from "@/data/services";

/** POST /api/workers — register a new worker from the onboarding flow. */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.serviceSlug || !body.city) {
      return NextResponse.json(
        { error: "name, serviceSlug and city are required" },
        { status: 400 }
      );
    }
    const service = getService(body.serviceSlug);
    const worker = await createWorker({
      name: body.name.toString().slice(0, 80),
      phone: body.phone?.toString(),
      profession: service?.name ?? body.profession ?? "Worker",
      serviceSlug: body.serviceSlug,
      skills: Array.isArray(body.skills) ? body.skills.slice(0, 12) : [],
      experienceYears: Math.max(0, Number(body.experienceYears) || 0),
      price: Math.max(0, Number(body.price) || 0),
      priceModel: ["day", "hour", "visit"].includes(body.priceModel) ? body.priceModel : "visit",
      city: body.city,
      area: (body.area || "").toString().slice(0, 80),
      serviceAreas: Array.isArray(body.serviceAreas) ? body.serviceAreas.slice(0, 12) : [],
    });
    return NextResponse.json({ worker }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to register worker" }, { status: 500 });
  }
}
