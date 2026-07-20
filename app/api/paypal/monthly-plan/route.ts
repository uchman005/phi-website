import { NextResponse } from "next/server";
import { ensureMonthlyPlanId } from "@/lib/paypal";

export async function GET() {
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
