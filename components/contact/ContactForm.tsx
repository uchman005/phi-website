"use client";

import { useState, type FormEvent } from "react";
import { TbSend } from "react-icons/tb";

const subjects = [
  "General enquiry",
  "Partnership enquiry",
  "Donation enquiry",
  "Media / Press",
  "Volunteering",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-green-ll rounded-lg p-10 flex flex-col items-center text-center gap-4 border border-green-l">
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
          onClick={() => setSubmitted(false)}
          className="text-sm font-sans font-semibold text-green-d hover:text-green-dd transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <h2 className="font-display text-xl text-ink">Send us a message</h2>

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
            className="px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition"
            placeholder="First name"
          />
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
            className="px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition"
            placeholder="Last name"
          />
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
          className="px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition"
          placeholder="you@example.com"
        />
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
            className="px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition"
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
            className="px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition"
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
          className="px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition appearance-none"
        >
          <option value="">Select a subject…</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
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
          className="px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition resize-none"
          placeholder="Tell us about your interest or question…"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-d text-white rounded-pill font-sans font-semibold text-sm hover:bg-green-dd transition-colors shadow-sm self-start"
      >
        Send message
        <TbSend aria-hidden />
      </button>
    </form>
  );
}
