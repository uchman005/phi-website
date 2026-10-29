// Shared by the Kilimo Bunifu III engagement form (client) and its Server
// Action, so the options the server accepts always match the ones offered.

export const KB3_SOURCE = "kilimo-bunifu-2026";

export const KB3_ANSWER_MAX = 280;

export const kb3Roles = [
  "Student / young professional",
  "Educator / researcher",
  "Community leader / official",
  "NGO",
  "Business / investor",
  "Media",
] as const;

export const kb3Wants = {
  attend: "Attend in Bulawayo",
  online: "Join online",
  speak: "Speak / join a panel",
  partner: "Partner or sponsor",
  studyGroups: "Join December study groups",
  updates: "Updates only",
} as const;

export type Kb3Want = keyof typeof kb3Wants;

export const kb3SupportTypes = ["Funding", "Venue / tech", "Media", "Network"] as const;

export const ICAT_REGISTRATION_URL = "https://appropriatetech.net/index.php";

export type Kb3Field =
  | "name"
  | "email"
  | "country"
  | "organisation"
  | "whatsapp"
  | "role"
  | "wants"
  | "icatRegistered"
  | "speakTopic"
  | "speakBio"
  | "supportTypes"
  | "answer"
  | "consentContact";

/** Form order — focus goes to the first field in this list with an error. */
export const kb3FieldOrder: Kb3Field[] = [
  "name",
  "email",
  "country",
  "organisation",
  "whatsapp",
  "role",
  "wants",
  "icatRegistered",
  "speakTopic",
  "speakBio",
  "supportTypes",
  "answer",
  "consentContact",
];

export interface Kb3Values {
  name?: string;
  email?: string;
  country?: string;
  organisation?: string;
  whatsapp?: string;
  role?: string;
  wants?: Kb3Want[];
  icatRegistered?: string;
  speakTopic?: string;
  speakBio?: string;
  supportTypes?: string[];
  answer?: string;
  consentContact?: boolean;
  consentQuote?: boolean;
}

export interface Kb3FormState {
  status: "idle" | "error" | "success";
  errors: Partial<Record<Kb3Field, string>>;
  formError?: string;
  values: Kb3Values;
}

export const initialKb3State: Kb3FormState = {
  status: "idle",
  errors: {},
  values: {},
};
