"use server";

import { headers } from "next/headers";
import {
  KB3_ANSWER_MAX,
  KB3_SOURCE,
  kb3Roles,
  kb3SupportTypes,
  kb3Wants,
  type Kb3FormState,
  type Kb3Values,
  type Kb3Want,
} from "@/lib/kb3-form";
import { checkRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { saveSubmission } from "@/lib/submissions";
import { notifyOps } from "@/lib/notify";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Country code plus digits, allowing spaces, dashes and brackets.
const WHATSAPP_RE = /^\+\d[\d\s()-]{6,20}$/;

function text(formData: FormData, key: string, max = 200): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function list(formData: FormData, key: string): string[] {
  return formData.getAll(key).filter((v): v is string => typeof v === "string");
}

export async function submitKb3(
  _prev: Kb3FormState,
  formData: FormData
): Promise<Kb3FormState> {
  const wants = list(formData, "wants").filter((w): w is Kb3Want => w in kb3Wants);
  const values: Kb3Values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    country: text(formData, "country", 80),
    organisation: text(formData, "organisation"),
    whatsapp: text(formData, "whatsapp", 30),
    role: text(formData, "role"),
    wants,
    icatRegistered: text(formData, "icatRegistered", 10),
    speakTopic: text(formData, "speakTopic", 300),
    speakBio: text(formData, "speakBio", 500),
    supportTypes: list(formData, "supportTypes").filter((s) =>
      (kb3SupportTypes as readonly string[]).includes(s)
    ),
    answer: text(formData, "answer", KB3_ANSWER_MAX),
    consentContact: formData.get("consentContact") === "on",
    consentQuote: formData.get("consentQuote") === "on",
  };

  // Honeypot: pretend success so bots get no signal.
  if (text(formData, "website")) {
    return { status: "success", errors: {}, values: {} };
  }

  const errors: Kb3FormState["errors"] = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Enter an email address like name@domain.com.";
  if (!values.country) errors.country = "Enter your country.";
  if (values.whatsapp && !WHATSAPP_RE.test(values.whatsapp))
    errors.whatsapp = "Include your country code, e.g. +254 712 345 678.";
  if (!(kb3Roles as readonly string[]).includes(values.role ?? "")) errors.role = "Choose what best describes you.";
  if (wants.length === 0) errors.wants = "Choose at least one way to take part.";

  // Conditional fields are only required — and only kept — when relevant.
  if (wants.includes("attend")) {
    if (!["yes", "not-yet"].includes(values.icatRegistered ?? ""))
      errors.icatRegistered = "Tell us whether you've registered for the 12th ICAT.";
  } else values.icatRegistered = "";
  if (wants.includes("speak")) {
    if (!values.speakTopic) errors.speakTopic = "Tell us what you'd speak about.";
    if (!values.speakBio) errors.speakBio = "Add a short bio or your LinkedIn URL.";
  } else {
    values.speakTopic = "";
    values.speakBio = "";
  }
  if (wants.includes("partner")) {
    if (!values.supportTypes?.length) errors.supportTypes = "Choose at least one kind of support.";
  } else values.supportTypes = [];

  if (!values.consentContact) errors.consentContact = "We need your permission to contact you about the workshop.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const ip = clientIpFromHeaders(await headers());
  const limit = checkRateLimit(`kb3:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return {
      status: "error",
      errors: {},
      formError: `Too many sign-ups from your connection. Please try again in ${Math.ceil(
        (limit.retryAfterSeconds ?? 600) / 60
      )} minutes, or email admin@passionofhope.org.`,
      values,
    };
  }

  try {
    await saveSubmission(KB3_SOURCE, { ...values });
  } catch (err) {
    await notifyOps("Kilimo Bunifu III sign-up could not be saved", {
      error: String(err),
      email: values.email,
    });
    return {
      status: "error",
      errors: {},
      formError: "Sorry — we couldn't save your details. Please email admin@passionofhope.org instead.",
      values,
    };
  }

  await notifyOps("New Kilimo Bunifu III sign-up", { email: values.email, wants });
  // Echo back only what the success message needs.
  return { status: "success", errors: {}, values: { wants } };
}
