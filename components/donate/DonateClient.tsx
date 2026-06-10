"use client";

import { useState } from "react";
import DonateForm from "./DonateForm";
import DonateSummary from "./DonateSummary";

export default function DonateClient() {
  const [project, setProject] = useState("Jiimarishe Honey Project");
  const [amount, setAmount] = useState(50);
  const [frequency, setFrequency] = useState("Once");

  function handleUpdate(
    newProject: string,
    newAmount: number,
    newFrequency: string
  ) {
    setProject(newProject);
    setAmount(newAmount);
    setFrequency(newFrequency);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-12">
      <DonateForm onUpdate={handleUpdate} />
      <DonateSummary project={project} amount={amount} frequency={frequency} />
    </div>
  );
}
