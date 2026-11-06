"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { TbCheck, TbSend } from "react-icons/tb";
import PhoneInput from "react-phone-number-input";
// Bundled flags: the default ones load from another site, which our CSP blocks.
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { registerPreWorkshop } from "@/app/programs/kilimo-bunifu/pre-conference-workshop/actions";
import {
  initialPreWorkshopState,
  preWorkshopFieldOrder,
  type PreWorkshopField,
} from "@/lib/pre-workshop-form";

const inputClass =
  "w-full px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition aria-[invalid=true]:border-terra-d";

const labelClass = "font-sans text-sm font-medium text-ink";

// Boxes the library's country menu so it matches the text fields.
const phoneClass =
  "gap-1 [--PhoneInput-color--focus:var(--color-green)] [&_.PhoneInputCountry]:self-stretch [&_.PhoneInputCountry]:rounded-md [&_.PhoneInputCountry]:border [&_.PhoneInputCountry]:border-line [&_.PhoneInputCountry]:bg-cream [&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountry:focus-within]:border-green";

function Required() {
  return (
    <>
      <span className="text-terra-d" aria-hidden> *</span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

export default function PreWorkshopForm() {
  const [state, formAction, pending] = useActionState(registerPreWorkshop, initialPreWorkshopState);
  const { errors, values } = state;
  const formErrorRef = useRef<HTMLParagraphElement>(null);
  const [phone, setPhone] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (state.status !== "error") return;
    const first = preWorkshopFieldOrder.find((f) => state.errors[f]);
    if (first) document.getElementById(`pre-${first}`)?.focus();
    else formErrorRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-lg border border-green-l bg-green-ll p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green">
          <TbCheck className="text-2xl text-white" aria-hidden />
        </div>
        <h3 className="font-display text-2xl text-ink">You&apos;re registered.</h3>
        <p className="text-ink-2">
          See you at the pre-conference workshop on 14 November. We&apos;ll send the joining
          details to your email.
        </p>
      </div>
    );
  }

  // Submit by hand: React resets a form after its action runs, and that would
  // jump the country menu to the first country after a failed attempt.
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  const a11y = (field: PreWorkshopField, hint?: string) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": [errors[field] ? `pre-${field}-error` : "", hint ?? ""].filter(Boolean).join(" ") || undefined,
  });

  return (
    <form action={formAction} onSubmit={submit} noValidate className="flex flex-col gap-5 rounded-lg border border-line bg-paper p-5 sm:p-8">
      <div>
        <h3 className="font-display text-2xl text-ink">Register for 14 November</h3>
        <p className="mt-1 text-sm text-ink-3">
          Pre-conference workshop · Virtual · All fields are required.
        </p>
      </div>

      {state.formError && (
        <p ref={formErrorRef} tabIndex={-1} role="alert" className="rounded-md bg-terra-l px-4 py-3 text-sm text-terra-d">
          {state.formError}
        </p>
      )}

      {/* Honeypot — hidden from people and assistive tech; bots fill it in. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="pre-website">Website</label>
        <input id="pre-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pre-name" className={labelClass}>Name<Required /></label>
        <input id="pre-name" name="name" autoComplete="name" defaultValue={values.name} {...a11y("name")} className={inputClass} />
        {errors.name && <p id="pre-name-error" className="text-xs text-terra-d">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pre-email" className={labelClass}>Email<Required /></label>
        <input id="pre-email" name="email" type="email" autoComplete="email" defaultValue={values.email} {...a11y("email")} className={inputClass} />
        {errors.email && <p id="pre-email-error" className="text-xs text-terra-d">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pre-phone" className={labelClass}>Phone, with country code<Required /></label>
        <PhoneInput
          id="pre-phone"
          international
          defaultCountry="NG"
          // Locked so backspacing can't turn the number into another country's.
          countryCallingCodeEditable={false}
          flags={flags}
          value={phone}
          onChange={setPhone}
          autoComplete="tel"
          {...a11y("phone", "pre-phone-hint")}
          className={phoneClass}
          numberInputProps={{ className: inputClass }}
        />
        {/* The visible field can hold a partly formatted number; this holds the full one. */}
        <input type="hidden" name="phone" value={phone ?? ""} />
        <p id="pre-phone-hint" className="text-xs text-ink-3">
          Nigeria is selected. If your number is from another country, change it in the menu first.
        </p>
        {errors.phone && <p id="pre-phone-error" className="text-xs text-terra-d">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 self-start rounded-pill bg-green-d px-7 py-3 font-sans text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-dd disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Registering…" : "Register"}
        <TbSend aria-hidden />
      </button>
    </form>
  );
}
