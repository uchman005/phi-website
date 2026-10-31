// ---------------------------------------------------------------------------
// Organisations listed on /partners. To add one: drop its logo in
// public/images/logos/partners/ (optional — without one, the name is shown
// on its own) and add an entry below.
// ---------------------------------------------------------------------------

export interface Partner {
  name: string;
  logo?: string;
  /** One line on the relationship. */
  blurb?: string;
  url?: string;
}

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
  { name: "Ever Green Foundation", logo: "/images/logos/partners/evergreen.png" },
  {
    name: "University of Ilorin, Nigeria",
    // TODO(founder): logo for the University of Ilorin.
    blurb: "FEED programme partner at Maripha Farms, and a participating university for Kilimo Bunifu III.",
  },
  {
    name: "Tom Mboya University, Kenya",
    // TODO(founder): logo.
    blurb: "Participating university for Kilimo Bunifu III.",
  },
  {
    name: "Egerton University, Kenya",
    // TODO(founder): logo.
    blurb: "Participating university for Kilimo Bunifu III.",
  },
  // Logos for these two are square originals padded onto 16:9 canvases so the
  // card's crop doesn't cut them off.
  {
    // TODO(founder): the logo reads "Ateker Perennial Cash Crop Cooperative
    // Union" — confirm which name to show.
    name: "Ateker Perennial Cash Crop Farmers Union",
    logo: "/images/logos/partners/ateker-perennial-cash-crop-union.png",
  },
  {
    name: "Einos SACCO",
    logo: "/images/logos/partners/einos-sacco.png",
  },
];
