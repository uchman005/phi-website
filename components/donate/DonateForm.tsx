"use client";

import { useState, type ChangeEvent } from "react";
import { TbCheck, TbExternalLink } from "react-icons/tb";
import { donationProjects as projects } from "@/lib/donation-projects";

const presetAmounts = [25, 50, 100, 250];
const frequencies = ["Once", "Monthly"];

interface DonateFormProps {
  onUpdate: (
    projectId: string,
    projectName: string,
    amount: number,
    frequency: string
  ) => void;
}

export default function DonateForm({ onUpdate }: DonateFormProps) {
  const [selectedProject, setSelectedProject] = useState("jiimarishe");
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [frequency, setFrequency] = useState("Once");

  function selectProject(id: string) {
    setSelectedProject(id);
    const proj = projects.find((p) => p.id === id);
    onUpdate(id, proj?.name ?? id, isCustom ? Number(customAmount) || 0 : selectedAmount, frequency);
  }

  function selectAmount(amount: number) {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
    const proj = projects.find((p) => p.id === selectedProject);
    onUpdate(selectedProject, proj?.name ?? selectedProject, amount, frequency);
  }

  function handleCustomChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(val);
    setIsCustom(true);
    setSelectedAmount(0);
    const proj = projects.find((p) => p.id === selectedProject);
    onUpdate(selectedProject, proj?.name ?? selectedProject, Number(val) || 0, frequency);
  }

  function selectFrequency(f: string) {
    setFrequency(f);
    const proj = projects.find((p) => p.id === selectedProject);
    onUpdate(selectedProject, proj?.name ?? selectedProject, isCustom ? Number(customAmount) || 0 : selectedAmount, f);
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Step 1 – Project */}
      <fieldset>
        <legend className="font-sans font-bold text-base text-ink mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-green text-white text-xs flex items-center justify-center font-mono">
            1
          </span>
          Choose a project
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((p) => (
            <label
              key={p.id}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-150 ${
                selectedProject === p.id
                  ? `${p.accent} bg-cream`
                  : "border-line bg-cream hover:border-ink-3"
              }`}
            >
              <input
                type="radio"
                name="project"
                value={p.id}
                checked={selectedProject === p.id}
                onChange={() => selectProject(p.id)}
                className="sr-only"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  selectedProject === p.id
                    ? "border-green bg-green"
                    : "border-line-2 bg-paper"
                }`}
                aria-hidden
              >
                {selectedProject === p.id && (
                  <TbCheck className="text-white text-xs" />
                )}
              </span>
              <div>
                <span className="block font-sans font-semibold text-sm text-ink">
                  {p.name}
                </span>
                <span className="block font-sans text-xs text-ink-3 mt-0.5">
                  {p.description}
                </span>
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Step 2 – Amount */}
      <fieldset>
        <legend className="font-sans font-bold text-base text-ink mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-green text-white text-xs flex items-center justify-center font-mono">
            2
          </span>
          Select an amount
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => selectAmount(amt)}
              className={`py-3 rounded-lg border-2 font-sans font-bold text-sm transition-all duration-150 ${
                !isCustom && selectedAmount === amt
                  ? "border-green bg-green text-white"
                  : "border-line bg-cream text-ink hover:border-green-l"
              }`}
            >
              ${amt}
            </button>
          ))}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans text-ink-3 text-sm">
              $
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={customAmount}
              onChange={handleCustomChange}
              onClick={() => setIsCustom(true)}
              placeholder="Custom"
              aria-label="Custom amount in USD"
              className={`w-full py-3 pl-7 pr-3 rounded-lg border-2 font-sans font-bold text-sm text-ink placeholder:font-normal placeholder:text-ink-3 focus:outline-none transition-all duration-150 ${
                isCustom
                  ? "border-green bg-green/5"
                  : "border-line bg-cream hover:border-green-l"
              }`}
            />
          </div>
        </div>
      </fieldset>

      {/* Step 3 – Frequency */}
      <fieldset>
        <legend className="font-sans font-bold text-base text-ink mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-green text-white text-xs flex items-center justify-center font-mono">
            3
          </span>
          Frequency
        </legend>
        <div className="flex gap-3">
          {frequencies.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => selectFrequency(f)}
              className={`px-6 py-2.5 rounded-pill font-sans font-semibold text-sm border-2 transition-all duration-150 ${
                frequency === f
                  ? "border-green bg-green text-white"
                  : "border-line bg-cream text-ink hover:border-green-l"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Step 4 – Donor details */}
      <fieldset>
        <legend className="font-sans font-bold text-base text-ink mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-green text-white text-xs flex items-center justify-center font-mono">
            4
          </span>
          Your details
        </legend>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="donor-name"
              className="font-sans text-sm font-medium text-ink"
            >
              Full name <span className="text-terra" aria-hidden>*</span>
            </label>
            <input
              id="donor-name"
              type="text"
              required
              autoComplete="name"
              className="px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition"
              placeholder="Your full name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="donor-email"
              className="font-sans text-sm font-medium text-ink"
            >
              Email <span className="text-terra" aria-hidden>*</span>
            </label>
            <input
              id="donor-email"
              type="email"
              required
              autoComplete="email"
              className="px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition"
              placeholder="you@example.com"
            />
          </div>
        </div>
      </fieldset>

      {/* Other ways to give */}
      <div className="border-t border-line pt-8 flex flex-col gap-4">
        <h3 className="font-sans font-semibold text-sm text-ink">
          Other ways to give
        </h3>
        <div className="bg-cream rounded-lg p-5 border border-line flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-ll flex items-center justify-center shrink-0">
            <TbExternalLink className="text-green text-lg" aria-hidden />
          </div>
          <div>
            <h4 className="font-sans font-semibold text-sm text-ink mb-1">
              M-Changa (Mobile giving)
            </h4>
            <p className="text-xs text-ink-2 leading-relaxed">
              Donate via M-Changa for mobile money and Mpesa options available
              across East Africa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
