import { NextResponse } from "next/server";
import { createDonationOrder, validateAmount } from "@/lib/paypal";
import { resolveProjectId, resolveProjectName } from "@/lib/donation-projects";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const limit = checkRateLimit(`create-order:${clientIp(request)}`, 10, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  try {
    const body = await request.json();
    const amount = validateAmount(body.amount);

    // The project name is always resolved server-side from a known allow-list
    // — never trusted verbatim from the request — so a tampered request can't
    // inject arbitrary text into the PayPal order description.
    const projectId = resolveProjectId(String(body.projectId ?? ""));
    const projectName = resolveProjectName(projectId);

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
