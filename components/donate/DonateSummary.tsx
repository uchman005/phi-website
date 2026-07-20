"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { TbShieldCheck, TbHeartFilled } from "react-icons/tb";

interface DonateSummaryProps {
  projectId: string;
  project: string;
  amount: number;
  frequency: string;
  paypalConfigured: boolean;
}

type PaymentState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; reference: string; monthly: boolean };

export default function DonateSummary({
  projectId,
  project,
  amount,
  frequency,
  paypalConfigured,
}: DonateSummaryProps) {
  const [payment, setPayment] = useState<PaymentState>({ status: "idle" });

  const displayAmount = amount > 0 ? `$${amount}` : "—";
  const isMonthly = frequency === "Monthly";
  const total =
    isMonthly && amount > 0
      ? `$${(amount * 12).toLocaleString()} / year`
      : amount > 0
        ? `$${amount}`
        : "—";

  if (payment.status === "success") {
    return (
      <aside
        className="lg:sticky lg:top-20 bg-green-ddd rounded-xl p-6 flex flex-col gap-5 text-white"
        aria-label="Donation confirmation"
      >
        <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center">
          <TbHeartFilled className="text-2xl text-white" aria-hidden />
        </div>
        <h2 className="font-display text-2xl">Thank you!</h2>
        <p className="font-sans text-sm text-white/85 leading-relaxed">
          Your {payment.monthly ? "monthly gift" : "gift"} of{" "}
          <strong>${amount}</strong> to <strong>{project}</strong> has been
          received. A receipt will arrive from PayPal shortly — donations to
          PHI are tax-deductible to the extent permitted by law.
        </p>
        <p className="font-mono text-[10px] text-white/50 break-all">
          Reference: {payment.reference}
        </p>
        <button
          type="button"
          onClick={() => setPayment({ status: "idle" })}
          className="font-sans text-xs text-green-bright hover:text-white transition-colors text-left"
        >
          Make another donation
        </button>
      </aside>
    );
  }

  return (
    <aside
      className="lg:sticky lg:top-20 bg-green-ddd rounded-xl p-6 flex flex-col gap-6 text-white"
      aria-label="Donation summary"
    >
      <h2 className="font-sans font-bold text-base">Donation summary</h2>

      <dl className="flex flex-col gap-4">
        <div>
          <dt className="font-mono text-[10px] text-green-bright uppercase tracking-widest mb-1">
            Project
          </dt>
          <dd className="font-sans text-sm text-white/90">{project}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] text-green-bright uppercase tracking-widest mb-1">
            Frequency
          </dt>
          <dd className="font-sans text-sm text-white/90">{frequency}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] text-green-bright uppercase tracking-widest mb-1">
            Amount
          </dt>
          <dd className="font-display text-4xl text-white">{displayAmount}</dd>
        </div>
        {isMonthly && amount > 0 && (
          <div>
            <dt className="font-mono text-[10px] text-green-bright uppercase tracking-widest mb-1">
              Annual total
            </dt>
            <dd className="font-sans text-sm text-white/70">{total}</dd>
          </div>
        )}
      </dl>

      {/* 100% badge */}
      <div className="bg-green/20 rounded-lg p-4 flex items-start gap-3 border border-green/30">
        <TbShieldCheck
          className="text-green-bright text-xl shrink-0 mt-0.5"
          aria-hidden
        />
        <p className="font-sans text-xs text-white/80 leading-relaxed">
          <strong className="text-white">100% of your gift</strong> reaches the
          mission. All administrative costs are covered by our board and
          operational supporters.
        </p>
      </div>

      {payment.status === "error" && (
        <p
          role="alert"
          className="font-sans text-xs text-red-300 bg-red-950/40 border border-red-400/30 rounded-lg p-3 leading-relaxed"
        >
          {payment.message}
        </p>
      )}

      {paypalConfigured ? (
        // White card behind the buttons — PayPal renders dark text/buttons
        // that need a light backdrop for contrast.
        <div className="bg-white rounded-lg p-3">
          {amount > 0 ? (
            <PayPalButtons
              forceReRender={[amount, projectId, frequency]}
              style={{ layout: "vertical", shape: "pill", label: "donate" }}
              {...(isMonthly
                ? {
                    createSubscription: async (_data, actions) => {
                      const res = await fetch("/api/paypal/monthly-plan");
                      const json = await res.json();
                      if (!res.ok || !json.planId) {
                        throw new Error(
                          json.error ?? "Monthly giving is unavailable."
                        );
                      }
                      return actions.subscription.create({
                        plan_id: json.planId,
                        quantity: String(amount),
                        custom_id: projectId,
                      });
                    },
                    onApprove: async (data) => {
                      setPayment({
                        status: "success",
                        reference: data.subscriptionID ?? data.orderID ?? "",
                        monthly: true,
                      });
                    },
                  }
                : {
                    createOrder: async () => {
                      const res = await fetch("/api/paypal/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          amount,
                          projectId,
                          projectName: project,
                        }),
                      });
                      const json = await res.json();
                      if (!res.ok || !json.id) {
                        throw new Error(
                          json.error ?? "Unable to start the payment."
                        );
                      }
                      return json.id as string;
                    },
                    onApprove: async (data) => {
                      const res = await fetch("/api/paypal/capture-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ orderID: data.orderID }),
                      });
                      const json = await res.json();
                      if (!res.ok || json.status !== "COMPLETED") {
                        setPayment({
                          status: "error",
                          message:
                            json.error ??
                            "Payment could not be completed. You have not been charged.",
                        });
                        return;
                      }
                      setPayment({
                        status: "success",
                        reference: json.captureId ?? data.orderID ?? "",
                        monthly: false,
                      });
                    },
                  })}
              onError={(err) => {
                console.error("[paypal] button error:", err);
                setPayment({
                  status: "error",
                  message:
                    "Something went wrong with the payment. Please try again — you have not been charged.",
                });
              }}
              onCancel={() => setPayment({ status: "idle" })}
            />
          ) : (
            <p className="font-sans text-xs text-ink-3 text-center py-2">
              Enter an amount to continue
            </p>
          )}
        </div>
      ) : (
        <div className="bg-green/20 border border-green/30 rounded-lg p-4">
          <p className="font-sans text-xs text-white/70 leading-relaxed">
            Online payments are being set up. In the meantime, please reach us
            via the contact page to give directly.
          </p>
        </div>
      )}

      <p className="font-sans text-[10px] text-white/40 text-center leading-relaxed">
        Processed securely by PayPal. PHI is a registered 501(c)(3) — donations
        are tax-deductible to the extent permitted by law.
      </p>
    </aside>
  );
}
