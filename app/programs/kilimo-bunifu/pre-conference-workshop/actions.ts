"use server";

import { headers } from "next/headers";
import { after } from "next/server";
// The "max" rules check each country's real number ranges. They're large, so
// they stay here on the server rather than going to the browser.
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { PRE_WORKSHOP_SOURCE, type PreWorkshopFormState } from "@/lib/pre-workshop-form";
import { preWorkshopRegistrationOpen } from "@/lib/kilimo-bunifu";
import { checkRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { saveSubmission } from "@/lib/submissions";
import { notifyOps } from "@/lib/notify";
import { siteFacts } from "@/lib/site-facts";
import { fieldsEmail, sendMail } from "@/lib/mail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trimmed single-line text. */
function text(formData: FormData, key: string, max = 200): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

export async function registerPreWorkshop(
  _prev: PreWorkshopFormState,
  formData: FormData
): Promise<PreWorkshopFormState> {
  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone", 30),
  };

  // Honeypot: pretend success so bots get no signal.
  if (text(formData, "website")) {
    return { status: "success", errors: {}, values: {} };
  }

  // Checked here too, so a page left open from before the close can't register.
  if (!preWorkshopRegistrationOpen()) {
    return {
      status: "error",
      errors: {},
      formError: "Registration for the pre-conference workshop has closed.",
      values,
    };
  }

  const errors: PreWorkshopFormState["errors"] = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Enter an email address like name@domain.com.";
  const phone = parsePhoneNumberFromString(values.phone);
  if (!values.phone) errors.phone = "Select your country and enter your phone number.";
  else if (!phone) errors.phone = "Select your country, then enter your phone number.";
  else if (!phone.isValid()) errors.phone = "That number isn't valid for the selected country. Check it and try again.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  // Always stored and emailed in one format: +254712345678.
  if (phone) values.phone = phone.number;

  const ip = clientIpFromHeaders(await headers());
  const limit = checkRateLimit(`pre-workshop:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return {
      status: "error",
      errors: {},
      formError: `Too many registrations from your connection. Please try again in ${Math.ceil(
        (limit.retryAfterSeconds ?? 600) / 60
      )} minutes, or email ${siteFacts.contact.primaryEmail}.`,
      values,
    };
  }

  try {
    await saveSubmission(PRE_WORKSHOP_SOURCE, values);
  } catch (err) {
    await notifyOps("Pre-conference workshop registration could not be saved", {
      error: String(err),
      email: values.email,
    });
    return {
      status: "error",
      errors: {},
      formError: `Sorry — we couldn't save your details. Please email ${siteFacts.contact.primaryEmail} instead.`,
      values,
    };
  }

  // Email the team after the response is sent, so a slow or failed send
  // never delays or loses a registration (it's already saved above).
  after(() => emailRegistration(values));

  return { status: "success", errors: {}, values: {} };
}

async function emailRegistration(values: { name: string; email: string; phone: string }): Promise<void> {
  const { html, text: plain } = fieldsEmail(
    "New pre-conference workshop registration",
    [
      ["Event", "Kilimo Bunifu III pre-conference workshop (virtual), 14 November 2026"],
      ["Name", values.name],
      ["Email", values.email],
      ["Phone", values.phone],
    ],
    `Sent by the pre-conference workshop form on passionofhope.org. Reply to this email to reach the person directly. All registrations are also saved on the server in data/submissions/${PRE_WORKSHOP_SOURCE}.jsonl.`
  );

  const result = await sendMail({
    to: siteFacts.notify.kilimoBunifu2026,
    subject: `New pre-conference workshop registration: ${values.name}`,
    html,
    text: plain,
    replyTo: { address: values.email, name: values.name },
  });

  if (result.ok) {
    await notifyOps("Pre-conference workshop registration emailed", { email: values.email });
  } else {
    await notifyOps(
      "skipped" in result && result.skipped
        ? "Pre-conference registration saved but not emailed (email not configured)"
        : "Pre-conference registration saved but the email failed",
      { email: values.email, ...result }
    );
  }
}
