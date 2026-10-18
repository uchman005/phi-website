"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { TbSend } from "react-icons/tb";
import { submitContact } from "@/app/contact/actions";
import {
  CONTACT_MESSAGE_MAX,
  contactSubjects,
  initialContactState,
  type ContactField,
} from "@/lib/contact";

const inputClass =
  "px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition aria-[invalid=true]:border-terra-d";

// Form order — focus goes to the first field in this list that has an error.
const fieldIds: Record<ContactField, string> = {
  firstName: "first-name",
  lastName: "last-name",
  email: "email",
  phone: "phone",
  organisation: "organisation",
  subject: "subject",
  message: "message",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="text-xs font-sans text-terra-d">
      {message}
    </p>
  );
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState
  );
  const formErrorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.status !== "error") return;
    const first = (Object.keys(fieldIds) as ContactField[]).find(
      (f) => state.errors[f]
    );
    if (first) document.getElementById(fieldIds[first])?.focus();
    else formErrorRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="bg-green-ll rounded-lg p-10 flex flex-col items-center text-center gap-4 border border-green-l"
      >
        <div className="w-14 h-14 rounded-full bg-green flex items-center justify-center">
          <TbSend className="text-white text-2xl" aria-hidden />
        </div>
        <h3 className="font-sans font-bold text-lg text-ink">
          Message received!
        </h3>
        <p className="text-sm text-ink-2 max-w-xs">
          Thank you for reaching out. Someone from the PHI team will be in
          touch within 2 business days.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-sans font-semibold text-green-d hover:text-green-dd transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  const { errors, values } = state;
  const a11y = (field: ContactField) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${fieldIds[field]}-error` : undefined,
  });

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <h2 className="font-display text-xl text-ink">Send us a message</h2>

      {state.formError && (
        <p
          ref={formErrorRef}
          tabIndex={-1}
          role="alert"
          className="text-sm font-sans text-terra-d bg-terra-l rounded-md px-4 py-3"
        >
          {state.formError}
        </p>
      )}

      {/* Honeypot — hidden from people and assistive tech; bots fill it in. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="first-name"
            className="font-sans text-sm font-medium text-ink"
          >
            First name <span className="text-terra-d" aria-hidden>*</span>
          </label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            defaultValue={values.firstName}
            {...a11y("firstName")}
            className={inputClass}
            placeholder="First name"
          />
          <FieldError id="first-name" message={errors.firstName} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="last-name"
            className="font-sans text-sm font-medium text-ink"
          >
            Last name <span className="text-terra-d" aria-hidden>*</span>
          </label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            defaultValue={values.lastName}
            {...a11y("lastName")}
            className={inputClass}
            placeholder="Last name"
          />
          <FieldError id="last-name" message={errors.lastName} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="font-sans text-sm font-medium text-ink"
        >
          Email address <span className="text-terra-d" aria-hidden>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={values.email}
          {...a11y("email")}
          className={inputClass}
          placeholder="you@example.com"
        />
        <FieldError id="email" message={errors.email} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone"
            className="font-sans text-sm font-medium text-ink"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values.phone}
            className={inputClass}
            placeholder="+1 (000) 000-0000"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="organisation"
            className="font-sans text-sm font-medium text-ink"
          >
            Organisation
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            defaultValue={values.organisation}
            className={inputClass}
            placeholder="Organisation name"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="subject"
          className="font-sans text-sm font-medium text-ink"
        >
          Subject <span className="text-terra-d" aria-hidden>*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue={values.subject ?? ""}
          {...a11y("subject")}
          className={`${inputClass} appearance-none`}
        >
          <option value="">Select a subject…</option>
          {contactSubjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <FieldError id="subject" message={errors.subject} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="font-sans text-sm font-medium text-ink"
        >
          Message <span className="text-terra-d" aria-hidden>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={CONTACT_MESSAGE_MAX}
          defaultValue={values.message}
          {...a11y("message")}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your interest or question…"
        />
        <FieldError id="message" message={errors.message} />
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-d text-white rounded-pill font-sans font-semibold text-sm hover:bg-green-dd transition-colors shadow-sm self-start disabled:opacity-60 disabled:cursor-wait"
      >
        {pending ? "Sending…" : "Send message"}
        <TbSend aria-hidden />
      </button>
    </form>
  );
}

export default function ContactForm() {
  // Remounting the inner form is how "Send another message" clears the
  // action state back to its initial value.
  const [formKey, setFormKey] = useState(0);
  return (
    <ContactFormInner key={formKey} onReset={() => setFormKey((k) => k + 1)} />
  );
}
