"use client";

import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import DonateForm from "./DonateForm";
import DonateSummary from "./DonateSummary";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

export default function DonateClient() {
  const [projectId, setProjectId] = useState("sustaining-supporter");
  const [projectName, setProjectName] = useState("Sustaining Supporter");
  const [amount, setAmount] = useState(100);
  const [frequency, setFrequency] = useState("Once");

  function handleUpdate(
    newProjectId: string,
    newProjectName: string,
    newAmount: number,
    newFrequency: string
  ) {
    setProjectId(newProjectId);
    setProjectName(newProjectName);
    setAmount(newAmount);
    setFrequency(newFrequency);
  }

  const isMonthly = frequency === "Monthly";

  const summary = (
    <DonateSummary
      projectId={projectId}
      project={projectName}
      amount={amount}
      frequency={frequency}
      paypalConfigured={Boolean(PAYPAL_CLIENT_ID)}
    />
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-12">
      <DonateForm onUpdate={handleUpdate} />
      {PAYPAL_CLIENT_ID ? (
        // Subscriptions need the SDK loaded with vault + subscription intent,
        // one-time gifts need capture intent — key forces a clean reload when
        // the donor switches frequency.
        <PayPalScriptProvider
          key={isMonthly ? "subscription" : "capture"}
          options={{
            clientId: PAYPAL_CLIENT_ID,
            currency: "USD",
            components: "buttons",
            ...(isMonthly
              ? { intent: "subscription", vault: true }
              : { intent: "capture" }),
          }}
        >
          {summary}
        </PayPalScriptProvider>
      ) : (
        summary
      )}
    </div>
  );
}
