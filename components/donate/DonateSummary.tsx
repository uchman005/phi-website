"use client";

import { TbShieldCheck, TbArrowRight } from "react-icons/tb";

interface DonateSummaryProps {
  project: string;
  amount: number;
  frequency: string;
}

export default function DonateSummary({
  project,
  amount,
  frequency,
}: DonateSummaryProps) {
  const displayAmount = amount > 0 ? `$${amount}` : "—";
  const total =
    frequency === "Monthly" && amount > 0
      ? `$${(amount * 12).toLocaleString()} / year`
      : amount > 0
        ? `$${amount}`
        : "—";

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
        {frequency === "Monthly" && amount > 0 && (
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

      <button
        type="button"
        disabled={amount <= 0}
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green text-white rounded-pill font-sans font-semibold text-sm hover:bg-green-d disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Continue to payment
        <TbArrowRight aria-hidden />
      </button>

      <p className="font-sans text-[10px] text-white/40 text-center leading-relaxed">
        Processed securely. PHI is a registered 501(c)(3) — donations are
        tax-deductible to the extent permitted by law.
      </p>
    </aside>
  );
}
