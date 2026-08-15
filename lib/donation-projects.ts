// ---------------------------------------------------------------------------
// Single source of truth for donation projects — used by the donate form
// (client) and the PayPal API routes (server). Keeping one list means the
// server can validate an incoming projectId against a known allow-list and
// look up the canonical project name itself, rather than trusting whatever
// text a client request happens to send.
// ---------------------------------------------------------------------------

/** Client-safe: imported by both the donate UI and the server-only PayPal
 * helpers, so the minimum only needs to change in one place. */
export const MIN_DONATION_AMOUNT = 100;

export interface DonationProject {
  id: string;
  name: string;
  description: string;
  accent: string;
  iconBg: string;
  /** When true, DonateForm nudges the frequency selector to "Monthly" on selection. */
  sustaining?: boolean;
}

export const donationProjects: DonationProject[] = [
  {
    id: "feed-africa-ndhiwa",
    name: "FEED Africa – Ndhiwa",
    description: "Building Kenya's agro-ecology and enterprise training campus in Ndhiwa, Homa Bay County",
    accent: "border-terra",
    iconBg: "bg-terra-l text-terra",
  },
  {
    id: "feed-africa-maripha",
    name: "FEED Africa – Maripha",
    description: "The Farmer Entrepreneur Institute at Maripha Farms, Kwara State, Nigeria",
    accent: "border-ochre",
    iconBg: "bg-ochre-l text-ochre",
  },
  {
    id: "jiimarishe-kenya",
    name: "Jiimarishe Kenya",
    description: "Apiculture enterprise in Kendu Bay — up to 5× income increase for farmers",
    accent: "border-green",
    iconBg: "bg-green-ll text-green",
  },
  {
    id: "kilimo-bunifu-workshops",
    name: "Kilimo Bunifu Workshops",
    description: "Engaging Africa's next generation towards food sovereignty",
    accent: "border-blue-400",
    iconBg: "bg-blue-50 text-blue-500",
  },
  {
    id: "jiimarishe-drc",
    name: "Jiimarishe DRC",
    description: "Scaling the Jiimarishe apiculture and enterprise model into DRC communities",
    accent: "border-green-d",
    iconBg: "bg-green-l text-green-d",
  },
  {
    id: "chakula-bora-school-clubs",
    name: "Chakula Bora School Clubs",
    description: "After-school agro-ecology clubs teaching pupils to grow good food",
    accent: "border-red-400",
    iconBg: "bg-red-50 text-red-500",
  },
  {
    id: "sustaining-supporter",
    name: "Sustaining Supporter",
    description: "Cover PHI's core operating costs with a recurring monthly gift",
    accent: "border-ochre",
    iconBg: "bg-ochre-l text-ochre",
    sustaining: true,
  },
  {
    id: "general-fund",
    name: "General Fund",
    description: "Support wherever it is needed most across all programmes",
    accent: "border-green-d",
    iconBg: "bg-green-l text-green-d",
  },
];

const DEFAULT_PROJECT_ID = "general-fund";

export function isKnownProjectId(id: string): boolean {
  return donationProjects.some((p) => p.id === id);
}

/** Canonical project name for a given id — falls back to General Fund for unknown ids. */
export function resolveProjectName(id: string): string {
  return (
    donationProjects.find((p) => p.id === id)?.name ??
    donationProjects.find((p) => p.id === DEFAULT_PROJECT_ID)!.name
  );
}

/** Canonical project id — falls back to General Fund for unrecognised ids. */
export function resolveProjectId(id: string): string {
  return isKnownProjectId(id) ? id : DEFAULT_PROJECT_ID;
}
