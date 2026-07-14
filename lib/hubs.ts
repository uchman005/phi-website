// ---------------------------------------------------------------------------
// Single source of truth for PHI's hubs and their projects.
//
// Each hub has a leader, a location, a description of what they do, and an
// array of projects. Each project carries a base image, an array of gallery
// images, and a text description (an array of paragraphs).
//
// Images use the `HubImage` shape. Leave `src` undefined to render a labelled
// gradient placeholder — drop in a real path under /public/images when you
// have the photo. Everything below can be edited freely without touching the
// page components; the schema is what the pages rely on.
// ---------------------------------------------------------------------------

export type PlaceholderVariant = "default" | "terra" | "ochre" | "forest";

export interface HubImage {
  /** Path under /public (e.g. "/images/hubs/nigeria/farm-1.jpg"). Omit for a placeholder. */
  src?: string;
  /** Alt text — always fill this in, even for placeholders. */
  alt: string;
  /** Caption shown on gradient placeholders (and usable as a caption later). */
  label?: string;
  /** Gradient colour used when there is no `src`. */
  variant?: PlaceholderVariant;
}

export interface HubProject {
  slug: string;
  name: string;
  /** One-line summary shown on project cards. */
  summary: string;
  /** Main image for the project (card + top of the project page). */
  baseImage: HubImage;
  /** Additional images shown in the project gallery. */
  gallery: HubImage[];
  /** Body text — one string per paragraph. */
  description: string[];
}

export interface Hub {
  slug: string;
  /** Full organisation name, e.g. "Nabahya Food Institute". */
  name: string;
  /** Short label, e.g. "DRC Hub". */
  shortName: string;
  country: string;
  city: string;
  region: string;
  /** Emoji flag. */
  flag: string;
  leader: string;
  leaderRole: string;
  leaderPhoto: HubImage;
  /** One-line positioning statement. */
  tagline: string;
  /** What the hub does — one string per paragraph. */
  description: string[];
  /** Short focus/programme tags. */
  focus: string[];
  /** Hero image for the hub page and list card. */
  heroImage: HubImage;
  /** Top-border accent class used on cards. */
  accent: string;
  projects: HubProject[];
}

// A small set of stand-in gallery images so every project page looks complete.
// Replace these `src` values with real, hub-specific photos when available.
function galleryPlaceholders(
  labelPrefix: string,
  variant: PlaceholderVariant
): HubImage[] {
  return [
    { alt: `${labelPrefix} — photo 1`, label: "Add photo", variant },
    { alt: `${labelPrefix} — photo 2`, label: "Add photo", variant },
    { alt: `${labelPrefix} — photo 3`, label: "Add photo", variant },
  ];
}

export const hubs: Hub[] = [
  // ---------------------------------------------------------------- DRC ----
  {
    slug: "drc",
    name: "Nabahya Food Institute",
    shortName: "DRC Hub",
    country: "Democratic Republic of Congo",
    city: "Uvira",
    region: "South Kivu",
    flag: "🇨🇩",
    leader: "Guillain Nabahya",
    leaderRole: "Board Chair & Director, Nabahya Food Institute",
    leaderPhoto: {
      src: "/images/people/team/guillain-nabahya.jpg",
      alt: "Guillain Nabahya",
    },
    tagline:
      "Regenerative agriculture and clean energy for food sovereignty in eastern Congo.",
    description: [
      "The Nabahya Food Institute (NFI) takes a holistic approach to natural-resource management — regenerative agriculture, clean energy, reforestation and conservation, and rural women's empowerment — in a region where food insecurity affects tens of millions of people.",
      "From its base in Uvira, the hub turns agricultural waste into clean cooking fuel, rebuilds soils with organic inputs, restores degraded land with native trees, and organises women farmers into cooperatives that strengthen food sovereignty and market access.",
    ],
    focus: [
      "Regenerative agriculture",
      "Clean energy",
      "Reforestation",
      "Women's cooperatives",
    ],
    heroImage: {
      src: "/images/hero/sustainable-farming-drc.png",
      alt: "Sustainable farming in the DRC",
    },
    accent: "border-t-green",
    projects: [
      {
        slug: "briquette-production",
        name: "Briquette Production",
        summary: "Clean cooking fuel made from agricultural waste.",
        baseImage: {
          src: "/images/hero/sustainable-farming-drc.png",
          alt: "Briquette production from agricultural waste",
        },
        gallery: galleryPlaceholders("Briquette production", "forest"),
        description: [
          "NFI manufactures sustainable cooking fuel from agricultural waste — crop residues, biomass, palm and coconut shells, and maize stalks — that would otherwise be burned or discarded.",
          "The briquettes replace charcoal and firewood, lowering household energy costs while easing pressure on the region's forests. Since May 2023 the hub has produced over 460 tons of briquettes and avoided an estimated 937+ metric tons of CO₂ emissions.",
        ],
      },
      {
        slug: "bio-fertilizer",
        name: "Bio-fertilizer & Bio-pesticide",
        summary: "Organic inputs that raise yields without chemicals.",
        baseImage: {
          src: "/images/gallery/gallery-05.jpg",
          alt: "Organic bio-fertilizer preparation",
        },
        gallery: galleryPlaceholders("Bio-fertilizer", "forest"),
        description: [
          "Women farmers are trained to produce organic fertilizers and pesticides by combining briquette ashes with manure, biochar, and other local materials.",
          "The result is healthier soil, lower input costs, and crop yield increases of roughly 150% — reducing dependence on imported chemical fertilizers.",
        ],
      },
      {
        slug: "farmer-field-schools",
        name: "Farmer Field Schools",
        summary: "Hands-on learning in intercropping and recycling.",
        baseImage: {
          src: "/images/gallery/gallery-02.jpg",
          alt: "Farmer field school session",
        },
        gallery: galleryPlaceholders("Farmer field schools", "forest"),
        description: [
          "Ten farmer field schools teach cooperative members intercropping techniques, recycling practices, and sustainable agriculture.",
          "Members learn by doing — experimenting on their own plots and sharing results — so knowledge spreads through the community rather than flowing one way from experts to farmers.",
        ],
      },
      {
        slug: "reforestation",
        name: "Reforestation & Conservation",
        summary: "Native trees restoring degraded land.",
        baseImage: {
          src: "/images/hero/ecosystem-revival.jpg",
          alt: "Reforestation and tree planting",
        },
        gallery: galleryPlaceholders("Reforestation", "forest"),
        description: [
          "NFI plants native tree species that provide organic nutrients and forage for livestock while restoring degraded ecosystems and creating community forests.",
          "Since May 2023 the programme has restored more than 170 hectares of land through native tree planting.",
        ],
      },
      {
        slug: "womens-cooperatives",
        name: "Women's Cooperatives",
        summary: "Organising women farmers for food sovereignty.",
        baseImage: {
          src: "/images/gallery/gallery-06.jpg",
          alt: "Women's farming cooperative",
        },
        gallery: galleryPlaceholders("Women's cooperatives", "forest"),
        description: [
          "The hub helps small-scale farmers — predominantly women — form cooperatives that strengthen food sovereignty and improve access to markets.",
          "Together with the hub's briquette, bio-fertilizer, and reforestation work, these cooperatives have reached an estimated 72,000 end-users.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------ NIGERIA ----
  {
    slug: "nigeria",
    name: "Maripha Empowerment Foundation",
    shortName: "Nigeria Hub",
    country: "Nigeria",
    city: "Maripha Farms",
    region: "Kwara State",
    flag: "🇳🇬",
    leader: "Mariam Olorundare",
    leaderRole: "CEO, Maripha Empowerment Foundation",
    leaderPhoto: {
      src: "/images/people/team/mariam-olorundare.jpg",
      alt: "Mariam Olorundare",
    },
    tagline:
      "A 15-acre demonstration farm proving regenerative agriculture can rebuild rural economies.",
    description: [
      "Maripha Farms is a 15-acre demonstration farm for integrated, organic agriculture in the Guinea Savannah of Kwara State — the transition zone between Nigeria's arid north and humid south.",
      "Modelled on the Songhai Institute's integrated approach, where nothing is wasted and biodiversity is restored, the hub develops young people as agents of change and works toward food sovereignty across Kwara State.",
    ],
    focus: [
      "Integrated organic farming",
      "Youth development",
      "Value addition",
      "Food sovereignty",
    ],
    heroImage: {
      src: "/images/hero/rice-fields-uganda.jpg",
      alt: "Integrated demonstration farm",
    },
    accent: "border-t-terra",
    projects: [
      {
        slug: "demonstration-farm",
        name: "Integrated Organic Demonstration Farm",
        summary: "A whole-system farm where nothing is wasted.",
        baseImage: {
          src: "/images/hero/farm-to-fork.png",
          alt: "Integrated organic demonstration farm",
        },
        gallery: galleryPlaceholders("Demonstration farm", "terra"),
        description: [
          "The 15-acre farm cultivates a diverse mix of crops — rice, maize, millet, soya beans, groundnut, tomatoes, pepper, yam, sweet potatoes, cashew, palm, and cassava — alongside planned livestock including tilapia, chickens, goats, and rabbits.",
          "Following the Songhai model of integrated, regenerative agriculture, the farm experiments with azolla and black soldier fly larvae for feed production, closing loops so that the waste from one system becomes an input for the next.",
        ],
      },
      {
        slug: "youth-agents-of-change",
        name: "Youth as Agents of Change",
        summary: "Equipping young people, including students, to lead.",
        baseImage: {
          src: "/images/hero/rural-youth-education.jpg",
          alt: "Young people learning regenerative farming",
        },
        gallery: galleryPlaceholders("Youth development", "terra"),
        description: [
          "The hub develops young people — including secondary-school students — as agents of change, introducing them to regenerative agriculture, enterprise, and stewardship before they leave the classroom.",
          "The goal is to shift the trajectory of rural communities from deepening poverty toward a robust economic and ecological future, led by a generation that sees farming as opportunity rather than last resort.",
        ],
      },
      {
        slug: "value-addition",
        name: "Value Addition — Maripha Cuisine",
        summary: "Farm-to-table sourcing that adds value to harvests.",
        baseImage: {
          src: "/images/programs/touching-lives.png",
          alt: "Value addition and farm-to-table food",
        },
        gallery: galleryPlaceholders("Value addition", "terra"),
        description: [
          "Through a partnership with Maripha Cuisine, the hub links the farm directly to the table — processing and adding value to harvests rather than selling raw produce at the lowest margin.",
          "Value addition keeps more income in the community and demonstrates a viable, replicable business model for other smallholder farmers in the region.",
        ],
      },
      {
        slug: "womens-regenerative-training",
        name: "Women & Regenerative Training",
        summary: "Training women farmers in regenerative methods.",
        baseImage: {
          src: "/images/gallery/gallery-03.jpeg",
          alt: "Women in regenerative agriculture training",
        },
        gallery: galleryPlaceholders("Women's training", "terra"),
        description: [
          "The hub trains women farmers in regenerative and organic methods that rebuild soil, cut input costs, and raise yields.",
          "This project is an outline — replace this text and its images with the specific details, numbers, and photos from the Nigeria hub when you have them.",
        ],
      },
    ],
  },

  // -------------------------------------------------------------- KENYA ----
  {
    slug: "kenya",
    name: "Kendu Bay Hub — KSWCSI",
    shortName: "Kenya Hub",
    country: "Kenya",
    city: "Kendu Bay",
    region: "Homa Bay & Nakuru Counties",
    flag: "🇰🇪",
    leader: "Mary Omega",
    leaderRole: "Hub Leader; Founder & President, KSWCSI",
    leaderPhoto: {
      src: "/images/people/team/mary-omega.jpg",
      alt: "Mary Omega",
    },
    tagline:
      "Women-led enterprise, water, and beekeeping across Homa Bay and Nakuru.",
    description: [
      "The Kenya hub, led from Kendu Bay, combines rainwater harvesting, beekeeping, and school water projects to lift smallholder households — with women's economic empowerment and gender-based-violence activism at its centre.",
      "A 2021 pilot with 20 farmers in Gilgil delivered up to a five-fold increase in income by pairing rainwater harvesting with beekeeping, and the model is now scaling across Homa Bay and Nakuru counties.",
    ],
    focus: [
      "Jiimarishe apiculture",
      "Clean water for schools",
      "Women's enterprise",
      "Chama savings",
    ],
    heroImage: {
      src: "/images/programs/jiimarishe-honey.jpg",
      alt: "Jiimarishe honey project",
    },
    accent: "border-t-ochre",
    projects: [
      {
        slug: "jiimarishe-honey",
        name: "Jiimarishe Honey Project",
        summary: "Rainwater harvesting paired with beekeeping.",
        baseImage: {
          src: "/images/programs/jiimarishe-honey.jpg",
          alt: "Jiimarishe honey project beehives",
        },
        gallery: galleryPlaceholders("Jiimarishe honey", "ochre"),
        description: [
          "The Jiimarishe honey venture helps smallholder farmers combine rainwater harvesting with beekeeping to strengthen their financial position and the wellbeing of their families.",
          "The 2021 Gilgil pilot with 20 farmers produced up to a five-fold increase in income — capturing rainwater for consumption and agriculture, with beekeeping adding a resilient second income stream.",
        ],
      },
      {
        slug: "clean-water-for-schools",
        name: "Adopt-A-School & Clean Water",
        summary: "Rainwater systems bringing safe water to schools.",
        baseImage: {
          src: "/images/programs/adopt-a-school.jpeg",
          alt: "Clean water project for schools",
        },
        gallery: galleryPlaceholders("Clean water for schools", "ochre"),
        description: [
          "Schools receive rainwater harvesting systems that provide clean, safe water for drinking and cooking, with greywater directed to school gardens.",
          "Through a partnership with Running Water International, the Clean Water Project for Schools has reached 90 schools and more than 36,000 students in the Meru and Nakuru regions of Kenya, supported by partnerships with schools in the United States.",
        ],
      },
      {
        slug: "chama-model",
        name: "Chama Micro-Lending Model",
        summary: "Savings groups investing in shared assets.",
        baseImage: {
          src: "/images/gallery/gallery-07.jpg",
          alt: "Community savings group meeting",
        },
        gallery: galleryPlaceholders("Chama model", "ochre"),
        description: [
          "The Chama model enables community members to form savings groups and collectively invest in productive assets — water tanks, beehives, and hand-washing stations — based on group approval.",
          "By pooling savings and decisions, members build both financial resilience and the shared infrastructure their livelihoods depend on.",
        ],
      },
    ],
  },
];

// --------------------------------------------------------------- helpers ----

export function getHub(slug: string): Hub | undefined {
  return hubs.find((hub) => hub.slug === slug);
}

export function getProject(
  hubSlug: string,
  projectSlug: string
): { hub: Hub; project: HubProject } | undefined {
  const hub = getHub(hubSlug);
  const project = hub?.projects.find((p) => p.slug === projectSlug);
  if (!hub || !project) return undefined;
  return { hub, project };
}

/** All { hub } params for the hub detail route. */
export function getHubParams(): { hub: string }[] {
  return hubs.map((hub) => ({ hub: hub.slug }));
}

/** All { hub, project } params for the project detail route. */
export function getHubProjectParams(): { hub: string; project: string }[] {
  return hubs.flatMap((hub) =>
    hub.projects.map((project) => ({ hub: hub.slug, project: project.slug }))
  );
}
