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

import { createVerify } from "node:crypto";
import { MIN_DONATION_AMOUNT } from "./donation-projects";

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

const MAX_DONATION = 100_000;

/** Donation bounds enforced server-side regardless of what the client sends. */
export function validateAmount(raw: unknown): number {
  const amount = Number(raw);
  if (!Number.isFinite(amount) || !Number.isInteger(amount)) {
    throw new Error("Amount must be a whole number of US dollars");
  }
  if (amount < MIN_DONATION_AMOUNT || amount > MAX_DONATION) {
    throw new Error(
      `Amount must be between $${MIN_DONATION_AMOUNT} and $${MAX_DONATION.toLocaleString()}`
    );
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
//
// PayPal's own remote /v1/notifications/verify-webhook-signature API is the
// documented way to verify webhooks — but its Sandbox implementation is
// unreliable: testing this integration live showed it returns
// "verification_status": "SUCCESS" for a completely fabricated request
// (fake transmission headers, fake signature). Verified directly against
// PayPal's sandbox API, not a guess. Production/Live is expected to enforce
// this properly, but relying on the remote check would leave the webhook
// forgeable in Sandbox, and there is no way to be certain Live doesn't share
// the same soft spot.
//
// Signature verification is done locally instead, per PayPal's documented
// algorithm: fetch PayPal's signing certificate (only ever from PayPal's own
// API domain — a hard requirement, or a forged cert_url could point
// verification at an attacker-controlled certificate), reconstruct the
// signed message, and verify it cryptographically. This is correct and
// trustworthy in both Sandbox and Live.

const ALLOWED_CERT_HOSTS = new Set(["api.paypal.com", "api.sandbox.paypal.com"]);
const CERT_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // PayPal's certs are long-lived
const certCache = new Map<string, { pem: string; fetchedAt: number }>();

// Small pure-JS CRC-32 (no Node version dependency — zlib.crc32 only landed
// in very recent Node releases and hosting providers vary in what they run).
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

async function getPayPalCert(certUrl: string): Promise<string> {
  const cached = certCache.get(certUrl);
  if (cached && Date.now() - cached.fetchedAt < CERT_CACHE_TTL_MS) {
    return cached.pem;
  }
  const res = await fetch(certUrl, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch PayPal signing certificate (${res.status})`);
  }
  const pem = await res.text();
  certCache.set(certUrl, { pem, fetchedAt: Date.now() });
  return pem;
}

/**
 * Verifies a PayPal webhook's signature locally. `rawBody` must be the exact
 * bytes PayPal sent (not a re-serialized JSON.stringify of the parsed
 * object) — the signature covers the literal request body. Requires
 * PAYPAL_WEBHOOK_ID (see .env.local.example for how to obtain it).
 */
export async function verifyWebhookSignature(
  headers: Headers,
  rawBody: string
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    throw new Error("PAYPAL_WEBHOOK_ID is not configured");
  }

  const authAlgo = headers.get("paypal-auth-algo");
  const certUrl = headers.get("paypal-cert-url");
  const transmissionId = headers.get("paypal-transmission-id");
  const transmissionSig = headers.get("paypal-transmission-sig");
  const transmissionTime = headers.get("paypal-transmission-time");

  if (!authAlgo || !certUrl || !transmissionId || !transmissionSig || !transmissionTime) {
    return false;
  }

  let certHost: string;
  try {
    certHost = new URL(certUrl).hostname;
  } catch {
    return false;
  }
  if (!ALLOWED_CERT_HOSTS.has(certHost)) {
    console.error("[paypal webhook] rejected cert_url on unexpected host:", certHost);
    return false;
  }

  const certPem = await getPayPalCert(certUrl);
  const crc = crc32(Buffer.from(rawBody, "utf8"));
  const message = `${transmissionId}|${transmissionTime}|${webhookId}|${crc}`;
  const nodeAlgo = authAlgo.toUpperCase().includes("SHA256")
    ? "RSA-SHA256"
    : "RSA-SHA1";

  try {
    const verifier = createVerify(nodeAlgo);
    verifier.update(message);
    verifier.end();
    return verifier.verify(certPem, transmissionSig, "base64");
  } catch (err) {
    console.error("[paypal webhook] local signature verification error:", err);
    return false;
  }
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
