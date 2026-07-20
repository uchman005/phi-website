import { NextResponse } from "next/server";
import { captureDonationOrder } from "@/lib/paypal";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderID = String(body.orderID ?? "");
    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 });
    }

    const capture = await captureDonationOrder(orderID);
    const captureId =
      capture?.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? null;

    return NextResponse.json({
      status: capture.status,
      captureId,
      payerEmail: capture?.payer?.email_address ?? null,
    });
  } catch (err) {
    console.error("[paypal] capture-order failed:", err);
    return NextResponse.json(
      { error: "Payment could not be completed. You have not been charged." },
      { status: 400 }
    );
  }
}
