"use server";

import { headers } from "next/headers";
import {
  CONTACT_MESSAGE_MAX,
  contactSubjects,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact";
import { checkRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { saveSubmission } from "@/lib/submissions";
import { notifyOps } from "@/lib/notify";
import { siteFacts } from "@/lib/site-facts";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string, max = 200): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const values: Record<ContactField, string> = {
    firstName: text(formData, "firstName"),
    lastName: text(formData, "lastName"),
    email: text(formData, "email"),
    phone: text(formData, "phone", 40),
    organisation: text(formData, "organisation"),
    subject: text(formData, "subject"),
    message: text(formData, "message", CONTACT_MESSAGE_MAX),
  };

  // Honeypot: real visitors never see or fill this field. Pretend success so
  // bots get no signal to adapt to.
  if (text(formData, "website")) {
    return { status: "success", errors: {}, values: {} };
  }

  const errors: ContactFormState["errors"] = {};
  if (!values.firstName) errors.firstName = "Enter your first name.";
  if (!values.lastName) errors.lastName = "Enter your last name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(values.email))
    errors.email = "Enter an email address like name@domain.com.";
  if (!(contactSubjects as readonly string[]).includes(values.subject))
    errors.subject = "Choose a subject.";
  if (!values.message) errors.message = "Enter a message.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const ip = clientIpFromHeaders(await headers());
  const limit = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return {
      status: "error",
      errors: {},
      formError: `Too many messages from your connection. Please try again in ${Math.ceil(
        (limit.retryAfterSeconds ?? 600) / 60
      )} minutes, or email ${siteFacts.contact.primaryEmail}.`,
      values,
    };
  }

  try {
    await saveSubmission("contact", values);
  } catch (err) {
    await notifyOps("Contact form submission could not be saved", {
      error: String(err),
      email: values.email,
    });
    return {
      status: "error",
      errors: {},
      formError:
        `Sorry — your message couldn't be sent. Please email ${siteFacts.contact.primaryEmail} instead.`,
      values,
    };
  }

  await notifyOps("New contact form message", {
    subject: values.subject,
    email: values.email,
  });
  return { status: "success", errors: {}, values: {} };
}
