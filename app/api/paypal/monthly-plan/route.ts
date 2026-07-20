import { NextResponse } from "next/server";
import { ensureMonthlyPlanId } from "@/lib/paypal";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const limit = checkRateLimit(`monthly-plan:${clientIp(request)}`, 10, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  try {
    const planId = await ensureMonthlyPlanId();
    return NextResponse.json({ planId });
  } catch (err) {
    console.error("[paypal] monthly-plan failed:", err);
    return NextResponse.json(
      { error: "Monthly giving is temporarily unavailable." },
      { status: 500 }
    );
  }
}
