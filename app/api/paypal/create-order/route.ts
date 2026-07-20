import { NextResponse } from "next/server";
import { createDonationOrder, validateAmount } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amount = validateAmount(body.amount);
    const projectId = String(body.projectId ?? "general-fund");
    const projectName = String(body.projectName ?? "General Fund");

    const order = await createDonationOrder({ amount, projectId, projectName });
    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error("[paypal] create-order failed:", err);
    const message =
      err instanceof Error && err.message.startsWith("Amount")
        ? err.message
        : "Unable to start the payment. Please try again.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
