// ---------------------------------------------------------------------------
// Server-side PayPal REST helpers (Orders v2 + Subscriptions v1).
//
// Required environment variables (see .env.local.example):
//   NEXT_PUBLIC_PAYPAL_CLIENT_ID  – PayPal app Client ID (safe to expose)
//   PAYPAL_CLIENT_SECRET          – PayPal app Secret (server only, never expose)
//   PAYPAL_ENV                    – "sandbox" (default) or "live"
//   PAYPAL_MONTHLY_PLAN_ID        – optional; billing plan for monthly gifts.
//                                   If unset, a $1/month quantity-based plan is
//                                   created automatically on first use.
// ---------------------------------------------------------------------------

const PAYPAL_ENV = process.env.PAYPAL_ENV === "live" ? "live" : "sandbox";

export const PAYPAL_API_BASE =
  PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

function getCredentials() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      "PayPal is not configured: set NEXT_PUBLIC_PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET"
    );
  }
  return { clientId, clientSecret };
}

async function getAccessToken(): Promise<string> {
  const { clientId, clientSecret } = getCredentials();
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`PayPal auth failed (${res.status}): ${await res.text()}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

async function paypalFetch(
  path: string,
  init: { method: string; body?: unknown }
) {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_API_BASE}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) {
    throw new Error(
      `PayPal ${init.method} ${path} failed (${res.status}): ${text}`
    );
  }
  return json;
}

/** Donation bounds enforced server-side regardless of what the client sends. */
export function validateAmount(raw: unknown): number {
  const amount = Number(raw);
  if (!Number.isFinite(amount) || !Number.isInteger(amount)) {
    throw new Error("Amount must be a whole number of US dollars");
  }
  if (amount < 1 || amount > 100_000) {
    throw new Error("Amount must be between $1 and $100,000");
  }
  return amount;
}

export async function createDonationOrder(input: {
  amount: number;
  projectId: string;
  projectName: string;
}): Promise<{ id: string }> {
  const order = await paypalFetch("/v2/checkout/orders", {
    method: "POST",
    body: {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: input.amount.toFixed(2),
          },
          description: `Donation — ${input.projectName}`.slice(0, 127),
          custom_id: input.projectId.slice(0, 127),
          soft_descriptor: "PASSIONOFHOPE",
        },
      ],
    },
  });
  return { id: order.id as string };
}

export async function captureDonationOrder(orderID: string) {
  return paypalFetch(`/v2/checkout/orders/${orderID}/capture`, {
    method: "POST",
  });
}

/** Fetch an order's current status — used to recover gracefully when a
 * capture request races a duplicate (e.g. React StrictMode double-invoke,
 * or a donor double-clicking) and PayPal reports ORDER_ALREADY_CAPTURED. */
export async function getDonationOrder(orderID: string) {
  return paypalFetch(`/v2/checkout/orders/${orderID}`, { method: "GET" });
}

// ------------------------------------------------------------- webhooks ----

/**
 * Verifies a PayPal webhook's signature via PayPal's own verification API —
 * PayPal checks the transmission headers against the event body server-side,
 * so we don't need to implement signature crypto ourselves. Requires
 * PAYPAL_WEBHOOK_ID (see .env.local.example for how to obtain it).
 */
export async function verifyWebhookSignature(
  headers: Headers,
  event: unknown
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    throw new Error("PAYPAL_WEBHOOK_ID is not configured");
  }

  const result = await paypalFetch("/v1/notifications/verify-webhook-signature", {
    method: "POST",
    body: {
      auth_algo: headers.get("paypal-auth-algo"),
      cert_url: headers.get("paypal-cert-url"),
      transmission_id: headers.get("paypal-transmission-id"),
      transmission_sig: headers.get("paypal-transmission-sig"),
      transmission_time: headers.get("paypal-transmission-time"),
      webhook_id: webhookId,
      webhook_event: event,
    },
  });

  return result.verification_status === "SUCCESS";
}

// ------------------------------------------------------------ monthly plan ----
//
// Monthly gifts use a single $1/month plan with quantity support: a $40/month
// donation is a subscription to the plan with quantity 40. This avoids creating
// a new plan for every amount. The plan is created once and cached; set
// PAYPAL_MONTHLY_PLAN_ID to pin it permanently (recommended for production —
// the ID is logged on first creation).

let cachedPlanId: string | null = null;

export async function ensureMonthlyPlanId(): Promise<string> {
  const pinned = process.env.PAYPAL_MONTHLY_PLAN_ID;
  if (pinned) return pinned;
  if (cachedPlanId) return cachedPlanId;

  const product = await paypalFetch("/v1/catalogs/products", {
    method: "POST",
    body: {
      name: "PHI Monthly Donation",
      description:
        "Recurring monthly donation to Passion of Hope International (501(c)(3))",
      type: "SERVICE",
      category: "CHARITY",
    },
  });

  const plan = await paypalFetch("/v1/billing/plans", {
    method: "POST",
    body: {
      product_id: product.id,
      name: "PHI Monthly Donation — $1 units",
      description:
        "Monthly donation billed as $1 units (quantity = donation amount in USD)",
      status: "ACTIVE",
      quantity_supported: true,
      billing_cycles: [
        {
          frequency: { interval_unit: "MONTH", interval_count: 1 },
          tenure_type: "REGULAR",
          sequence: 1,
          total_cycles: 0,
          pricing_scheme: {
            fixed_price: { value: "1.00", currency_code: "USD" },
          },
        },
      ],
      payment_preferences: {
        auto_bill_outstanding: true,
        payment_failure_threshold: 3,
      },
    },
  });

  cachedPlanId = plan.id as string;
  console.log(
    `[paypal] Created monthly billing plan ${cachedPlanId} — set PAYPAL_MONTHLY_PLAN_ID=${cachedPlanId} in your environment to pin it.`
  );
  return cachedPlanId;
}
