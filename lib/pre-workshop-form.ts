// Shared by the pre-conference workshop form (client) and its Server Action.

export const PRE_WORKSHOP_SOURCE = "kilimo-bunifu-2026-pre-conference";

export type PreWorkshopField = "name" | "email" | "phone";

/** Form order — focus goes to the first field in this list with an error. */
export const preWorkshopFieldOrder: PreWorkshopField[] = ["name", "email", "phone"];

export interface PreWorkshopFormState {
  status: "idle" | "error" | "success";
  errors: Partial<Record<PreWorkshopField, string>>;
  formError?: string;
  values: Partial<Record<PreWorkshopField, string>>;
}

export const initialPreWorkshopState: PreWorkshopFormState = {
  status: "idle",
  errors: {},
  values: {},
};
