import { NextResponse } from "next/server";
import { updateWorkerVerification } from "@/lib/db";
import type { VerificationStatus } from "@/lib/types";

const VALID: VerificationStatus[] = ["unverified", "pending", "verified", "rejected"];

/** PATCH /api/admin/verification — approve/reject a worker's verification. */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    if (!body.workerId || !VALID.includes(body.status)) {
      return NextResponse.json({ error: "workerId and a valid status are required" }, { status: 400 });
    }
    const ok = await updateWorkerVerification(body.workerId, body.status);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ error: "Failed to update verification" }, { status: 500 });
  }
}
