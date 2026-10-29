// ---------------------------------------------------------------------------
// Organisations listed on /partners. To add one: drop its logo in
// public/images/logos/partners/ (optional — without one, the name is shown
// on its own) and add an entry below with today's date as `addedOn`.
// Partners added in the last NEW_PARTNER_DAYS show a "New" badge.
// ---------------------------------------------------------------------------

export interface Partner {
  name: string;
  logo?: string;
  /** One line on the relationship. */
  blurb?: string;
  url?: string;
  /** Date added to this page (YYYY-MM-DD); drives the "New" badge. */
  addedOn?: string;
}

export const NEW_PARTNER_DAYS = 90;

export const partners: Partner[] = [
  { name: "Organic Consumers Alliance", logo: "/images/logos/partners/organic-consumers-alliance.png" },
  { name: "Running Water International, Kenya", logo: "/images/logos/partners/running-water-international.png" },
  { name: "Songhaï Centre, Benin", logo: "/images/logos/partners/songhai-centre.png" },
  { name: "International Network on Appropriate Technology", logo: "/images/logos/partners/inat.png" },
  // { name: "Green Belt Movement, Kenya", logo: "/images/logos/partners/green-belt-movement.jpeg" },
  { name: "African Leadership University, Mauritius", logo: "/images/logos/partners/alu.png" },
  { name: "Alchemy Inspiration, South Africa", logo: "/images/logos/partners/alchemy.png" },
  { name: "DHA East Africa", logo: "/images/logos/partners/dha-east-africa.jpg" },
  { name: "WICCARE Africa", logo: "/images/logos/partners/wiccare-africa.jpg" },
  { name: "Ever Green Foundation", logo: "/images/logos/partners/evergreen.png", addedOn: "2026-10-27" },
  {
    name: "University of Ilorin, Nigeria",
    // TODO(founder): logo for the University of Ilorin.
    blurb: "FEED programme partner at Maripha Farms, and a participating university for Kilimo Bunifu III.",
    addedOn: "2026-10-29",
  },
  {
    name: "Tom Mboya University, Kenya",
    // TODO(founder): logo.
    blurb: "Participating university for Kilimo Bunifu III.",
    addedOn: "2026-10-29",
  },
  {
    name: "Egerton University, Kenya",
    // TODO(founder): logo.
    blurb: "Participating university for Kilimo Bunifu III.",
    addedOn: "2026-10-29",
  },
];

export function isNewPartner(p: Partner, now: Date): boolean {
  if (!p.addedOn) return false;
  const age = now.getTime() - new Date(`${p.addedOn}T00:00:00Z`).getTime();
  return age >= 0 && age < NEW_PARTNER_DAYS * 86_400_000;
}
