// ---------------------------------------------------------------------------
// Single source of truth for donation projects — used by the donate form
// (client) and the PayPal API routes (server). Keeping one list means the
// server can validate an incoming projectId against a known allow-list and
// look up the canonical project name itself, rather than trusting whatever
// text a client request happens to send.
// ---------------------------------------------------------------------------

export interface DonationProject {
  id: string;
  name: string;
  description: string;
  accent: string;
  iconBg: string;
}

export const donationProjects: DonationProject[] = [
  {
    id: "jiimarishe",
    name: "Jiimarishe Honey Project",
    description: "Apiculture enterprise in Kenya — 5× income increase for farmers",
    accent: "border-green",
    iconBg: "bg-green-ll text-green",
  },
  {
    id: "adopt-a-school",
    name: "Adopt a School",
    description: "Rural school infrastructure, teachers, and learning materials",
    accent: "border-ochre",
    iconBg: "bg-ochre-l text-ochre",
  },
  {
    id: "clean-water",
    name: "Clean Water Initiative",
    description: "Bore-holes, rainwater harvesting, and water committee training",
    accent: "border-blue-400",
    iconBg: "bg-blue-50 text-blue-500",
  },
  {
    id: "medical-care",
    name: "Medical Care Access",
    description: "Mobile health clinics and community health worker training",
    accent: "border-red-400",
    iconBg: "bg-red-50 text-red-500",
  },
  {
    id: "kilimo-bunifu",
    name: "Kilimo Bunifu",
    description: "Innovative agro-ecological farming — Workshop.",
    accent: "border-terra",
    iconBg: "bg-terra-l text-terra",
  },
  {
    id: "FEED-Africa",
    name: "FEED Africa",
    description:
      "Integrates agro-ecological food systems that restore land, feed families, and build economic resilience.",
    accent: "border-terra",
    iconBg: "bg-terra-l text-terra",
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
