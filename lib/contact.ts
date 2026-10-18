// Shared by the contact form (client) and its Server Action, so the subject
// list the server accepts always matches the one the form offers.

export const contactSubjects = [
  "General enquiry",
  "Partnership enquiry",
  "Donation enquiry",
  "Media / Press",
  "Volunteering",
  "Other",
] as const;

export const CONTACT_MESSAGE_MAX = 5000;

export type ContactField = "firstName" | "lastName" | "email" | "phone" | "organisation" | "subject" | "message";

export interface ContactFormState {
  status: "idle" | "error" | "success";
  /** Field-level errors, in form order. */
  errors: Partial<Record<ContactField, string>>;
  /** Form-level error (rate limit, server failure). */
  formError?: string;
  /** What the visitor typed, echoed back so nothing is lost on error. */
  values: Partial<Record<ContactField, string>>;
}

export const initialContactState: ContactFormState = {
  status: "idle",
  errors: {},
  values: {},
};
