import { NextResponse } from "next/server";
import { captureDonationOrder, getDonationOrder } from "@/lib/paypal";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const limit = checkRateLimit(`capture-order:${clientIp(request)}`, 10, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  try {
    const body = await request.json();
    const orderID = String(body.orderID ?? "");
    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 });
    }

    let capture;
    try {
      capture = await captureDonationOrder(orderID);
    } catch (err) {
      // A duplicate capture attempt (double-click, React effect re-run, a
      // retried request) isn't a failure — the donor already paid. Look the
      // order up instead of surfacing a scary error for a successful gift.
      if (err instanceof Error && err.message.includes("ORDER_ALREADY_CAPTURED")) {
        capture = await getDonationOrder(orderID);
      } else {
        throw err;
      }
    }

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
