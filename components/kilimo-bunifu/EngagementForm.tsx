"use client";

import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { TbCheck, TbExternalLink, TbSend } from "react-icons/tb";
import { submitKb3 } from "@/app/programs/kilimo-bunifu/[edition]/actions";
import {
  ICAT_REGISTRATION_URL,
  KB3_ANSWER_MAX,
  initialKb3State,
  kb3FieldOrder,
  kb3Roles,
  kb3SupportTypes,
  kb3Wants,
  type Kb3Field,
  type Kb3Want,
} from "@/lib/kb3-form";

const inputClass =
  "w-full px-4 py-2.5 bg-cream border border-line rounded-md text-sm font-sans text-ink placeholder:text-ink-3 focus:outline-none focus:border-green focus:ring-2 focus:ring-green-l transition aria-[invalid=true]:border-terra-d";

const labelClass = "font-sans text-sm font-medium text-ink";

/** The element focused when a field has an error (first box for groups). */
const focusTarget: Record<Kb3Field, string> = {
  name: "kb3-name",
  email: "kb3-email",
  country: "kb3-country",
  organisation: "kb3-organisation",
  whatsapp: "kb3-whatsapp",
  role: "kb3-role",
  wants: "kb3-wants-attend",
  icatRegistered: "kb3-icat-yes",
  speakTopic: "kb3-speak-topic",
  speakBio: "kb3-speak-bio",
  supportTypes: "kb3-support-0",
  answer: "kb3-answer",
  consentContact: "kb3-consent-contact",
};

function Required() {
  return (
    <>
      <span className="text-terra-d" aria-hidden> *</span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="text-xs font-sans text-terra-d">{message}</p>;
}

function CheckOption({
  id,
  name,
  value,
  checked,
  onChange,
  defaultChecked,
  children,
  type = "checkbox",
}: {
  id: string;
  name: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  children: ReactNode;
  type?: "checkbox" | "radio";
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 rounded-md border border-line bg-cream px-3.5 py-2.5 text-sm text-ink transition-colors has-[:checked]:border-green has-[:checked]:bg-green-ll has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-green-l"
    >
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
        className="h-4 w-4 shrink-0 accent-green-d"
      />
      {children}
    </label>
  );
}

interface EngagementFormProps {
  /** "pre" before/on the day; "post" once the workshop is over. */
  phase: "pre" | "post";
}

function EngagementFormInner({ phase, onReset }: EngagementFormProps & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitKb3, initialKb3State);
  const { errors, values } = state;
  const [wants, setWants] = useState<Kb3Want[]>(values.wants ?? []);
  const [icat, setIcat] = useState(values.icatRegistered ?? "");
  const [answer, setAnswer] = useState(values.answer ?? "");
  const formErrorRef = useRef<HTMLParagraphElement>(null);
  const answerHint = useId();

  useEffect(() => {
    if (state.status !== "error") return;
    const first = kb3FieldOrder.find((f) => errors[f]);
    if (first) document.getElementById(focusTarget[first])?.focus();
    else formErrorRef.current?.focus();
  }, [state, errors]);

  if (state.status === "success") {
    const online = state.values.wants?.includes("online");
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-lg border border-green-l bg-green-ll p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green">
          <TbCheck className="text-2xl text-white" aria-hidden />
        </div>
        <h3 className="font-display text-2xl text-ink">You&apos;re in.</h3>
        <p className="text-ink-2">
          {phase === "pre"
            ? "We'll send details closer to 24 November."
            : "We'll be in touch about the December study groups."}
          {phase === "pre" && online && " The livestream link arrives 48 hours before."}
        </p>
        <button type="button" onClick={onReset} className="text-sm font-semibold text-green-d hover:text-green-dd">
          Sign up someone else
        </button>
      </div>
    );
  }

  const a11y = (field: Kb3Field) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `kb3-${field}-error` : undefined,
  });
  const toggleWant = (w: Kb3Want, on: boolean) =>
    setWants((prev) => (on ? [...prev, w] : prev.filter((x) => x !== w)));

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6 rounded-lg border border-line bg-paper p-5 sm:p-8">
      <p className="text-sm text-ink-3">
        Fields marked <span className="text-terra-d">*</span> are required.
      </p>

      {state.formError && (
        <p ref={formErrorRef} tabIndex={-1} role="alert" className="rounded-md bg-terra-l px-4 py-3 text-sm text-terra-d">
          {state.formError}
        </p>
      )}

      {/* Honeypot — hidden from people and assistive tech; bots fill it in. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="kb3-website">Website</label>
        <input id="kb3-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="kb3-name" className={labelClass}>Name<Required /></label>
          <input id="kb3-name" name="name" autoComplete="name" defaultValue={values.name} {...a11y("name")} className={inputClass} />
          <ErrorText id="kb3-name-error" message={errors.name} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="kb3-email" className={labelClass}>Email<Required /></label>
          <input id="kb3-email" name="email" type="email" autoComplete="email" defaultValue={values.email} {...a11y("email")} className={inputClass} />
          <ErrorText id="kb3-email-error" message={errors.email} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="kb3-country" className={labelClass}>Country<Required /></label>
          <input id="kb3-country" name="country" autoComplete="country-name" defaultValue={values.country} {...a11y("country")} className={inputClass} />
          <ErrorText id="kb3-country-error" message={errors.country} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="kb3-organisation" className={labelClass}>Organisation or university</label>
          <input id="kb3-organisation" name="organisation" autoComplete="organization" defaultValue={values.organisation} className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="kb3-whatsapp" className={labelClass}>WhatsApp number, with country code</label>
          <input id="kb3-whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="+254 712 345 678" defaultValue={values.whatsapp} {...a11y("whatsapp")} className={inputClass} />
          <ErrorText id="kb3-whatsapp-error" message={errors.whatsapp} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="kb3-role" className={labelClass}>I am a…<Required /></label>
        <select id="kb3-role" name="role" defaultValue={values.role ?? ""} {...a11y("role")} className={`${inputClass} appearance-none`}>
          <option value="">Choose one…</option>
          {kb3Roles.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <ErrorText id="kb3-role-error" message={errors.role} />
      </div>

      <fieldset {...a11y("wants")} className="flex flex-col gap-2">
        <legend className={`${labelClass} mb-2`}>I want to…<Required /> <span className="font-normal text-ink-3">(choose all that apply)</span></legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(Object.keys(kb3Wants) as Kb3Want[]).map((w) => (
            <CheckOption key={w} id={`kb3-wants-${w}`} name="wants" value={w} checked={wants.includes(w)} onChange={(on) => toggleWant(w, on)}>
              {kb3Wants[w]}
            </CheckOption>
          ))}
        </div>
        <ErrorText id="kb3-wants-error" message={errors.wants} />
      </fieldset>

      {wants.includes("attend") && (
        <fieldset {...a11y("icatRegistered")} className="flex flex-col gap-2 rounded-md border-l-4 border-ochre bg-ochre-l/40 p-4">
          <legend className={`${labelClass} mb-2`}>Registered for the 12th ICAT?<Required /></legend>
          <div className="flex flex-wrap gap-2">
            <CheckOption type="radio" id="kb3-icat-yes" name="icatRegistered" value="yes" checked={icat === "yes"} onChange={() => setIcat("yes")}>Yes</CheckOption>
            <CheckOption type="radio" id="kb3-icat-not-yet" name="icatRegistered" value="not-yet" checked={icat === "not-yet"} onChange={() => setIcat("not-yet")}>Not yet</CheckOption>
          </div>
          {icat === "not-yet" && (
            <p className="text-sm text-ink-2">
              In-person access to the workshop is through ICAT registration.{" "}
              <a href={ICAT_REGISTRATION_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-green-d underline hover:text-green-dd">
                Register for the 12th ICAT <TbExternalLink aria-hidden />
              </a>
            </p>
          )}
          <ErrorText id="kb3-icatRegistered-error" message={errors.icatRegistered} />
        </fieldset>
      )}

      {wants.includes("speak") && (
        <div className="flex flex-col gap-4 rounded-md border-l-4 border-ochre bg-ochre-l/40 p-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="kb3-speak-topic" className={labelClass}>What would you speak about?<Required /></label>
            <input id="kb3-speak-topic" name="speakTopic" defaultValue={values.speakTopic} {...a11y("speakTopic")} className={inputClass} />
            <ErrorText id="kb3-speakTopic-error" message={errors.speakTopic} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="kb3-speak-bio" className={labelClass}>Short bio or LinkedIn URL<Required /></label>
            <textarea id="kb3-speak-bio" name="speakBio" rows={3} defaultValue={values.speakBio} {...a11y("speakBio")} className={`${inputClass} resize-none`} />
            <ErrorText id="kb3-speakBio-error" message={errors.speakBio} />
          </div>
        </div>
      )}

      {wants.includes("partner") && (
        <fieldset {...a11y("supportTypes")} className="flex flex-col gap-2 rounded-md border-l-4 border-ochre bg-ochre-l/40 p-4">
          <legend className={`${labelClass} mb-2`}>What kind of support?<Required /></legend>
          <div className="grid grid-cols-2 gap-2">
            {kb3SupportTypes.map((s, n) => (
              <CheckOption key={s} id={`kb3-support-${n}`} name="supportTypes" value={s} defaultChecked={values.supportTypes?.includes(s)}>
                {s}
              </CheckOption>
            ))}
          </div>
          <ErrorText id="kb3-supportTypes-error" message={errors.supportTypes} />
        </fieldset>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="kb3-answer" className={labelClass}>In one sentence: what would make you build your future in Africa?</label>
        <textarea
          id="kb3-answer"
          name="answer"
          rows={2}
          maxLength={KB3_ANSWER_MAX}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          aria-describedby={answerHint}
          className={`${inputClass} resize-none`}
        />
        <p id={answerHint} className="text-right font-mono text-xs text-ink-3" aria-live="polite">
          {/* Announced politely only near the limit, not on every keystroke. */}
          <span aria-hidden={KB3_ANSWER_MAX - answer.length > 20}>
            {KB3_ANSWER_MAX - answer.length} characters left
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <CheckOption id="kb3-consent-contact" name="consentContact" value="on" defaultChecked={values.consentContact}>
          <span>You can contact me about this workshop.<Required /></span>
        </CheckOption>
        <ErrorText id="kb3-consentContact-error" message={errors.consentContact} />
        <CheckOption id="kb3-consent-quote" name="consentQuote" value="on" defaultChecked={values.consentQuote}>
          You may quote my answer anonymously in the workshop and outcomes report.
        </CheckOption>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 self-start rounded-pill bg-green-d px-7 py-3 font-sans text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-dd disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Sending…" : phase === "pre" ? "Count me in" : "Join the study groups"}
        <TbSend aria-hidden />
      </button>
    </form>
  );
}

export default function EngagementForm({ phase }: EngagementFormProps) {
  // Remounting clears the action state for "Sign up someone else".
  const [key, setKey] = useState(0);
  return <EngagementFormInner key={key} phase={phase} onReset={() => setKey((k) => k + 1)} />;
}
