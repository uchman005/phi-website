import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/paypal";
import { notifyOps } from "@/lib/notify";

export const runtime = "nodejs";

interface PayPalWebhookEvent {
  id?: string;
  event_type?: string;
  resource?: {
    id?: string;
    amount?: { currency_code?: string; value?: string };
    custom_id?: string;
    plan_id?: string;
    billing_agreement_id?: string;
    reason?: string;
  };
}

// PayPal expects a fast 2xx response to acknowledge receipt — it retries
// on non-2xx or timeout, so we verify synchronously (local crypto check, no
// external API call needed) and then respond; no background queue needed at
// this volume.
export async function POST(request: Request) {
  // Read the raw body once — the signature covers these exact bytes, so it
  // must be verified against this string, not a re-serialized JSON.stringify
  // of the parsed object (which could differ in whitespace/key order).
  const rawBody = await request.text();

  let event: PayPalWebhookEvent;
  try {
    event = JSON.parse(rawBody) as PayPalWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let verified: boolean;
  try {
    verified = await verifyWebhookSignature(request.headers, rawBody);
  } catch (err) {
    console.error("[paypal webhook] verification failed:", err);
    return NextResponse.json({ error: "Verification unavailable" }, { status: 400 });
  }

  if (!verified) {
    // Do not process the event — this could be a spoofed request. Log it for
    // investigation but tell PayPal it was rejected (they will not retry a
    // signature failure with the same payload, and a genuine PayPal event
    // will never fail verification).
    console.error("[paypal webhook] signature verification FAILED — rejecting", {
      id: event.id,
      eventType: event.event_type,
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const type = event.event_type ?? "UNKNOWN";
  const resource = event.resource ?? {};

  switch (type) {
    case "PAYMENT.CAPTURE.COMPLETED":
      console.log("[paypal webhook] capture completed", {
        captureId: resource.id,
        amount: resource.amount,
        projectId: resource.custom_id,
      });
      break;

    case "PAYMENT.CAPTURE.DENIED":
    case "PAYMENT.CAPTURE.REFUNDED":
    case "PAYMENT.CAPTURE.REVERSED":
      await notifyOps(`PayPal ${type}`, {
        captureId: resource.id,
        amount: resource.amount,
        projectId: resource.custom_id,
      });
      break;

    case "BILLING.SUBSCRIPTION.ACTIVATED":
      console.log("[paypal webhook] subscription activated", {
        subscriptionId: resource.id,
        planId: resource.plan_id,
      });
      break;

    case "BILLING.SUBSCRIPTION.CANCELLED":
    case "BILLING.SUBSCRIPTION.SUSPENDED":
    case "BILLING.SUBSCRIPTION.EXPIRED":
    case "BILLING.SUBSCRIPTION.PAYMENT.FAILED":
      // These are the events that matter most to catch: a recurring donor's
      // payment has stopped and nothing else in this codebase will notice.
      await notifyOps(`PayPal ${type}`, {
        subscriptionId: resource.id ?? resource.billing_agreement_id,
        reason: resource.reason,
      });
      break;

    default:
      console.log("[paypal webhook] unhandled event type", type);
  }

  return NextResponse.json({ received: true });
}
