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
//
// Hub photos live in /public/images/hubs/{drc,nigeria,kenya}/.
// ---------------------------------------------------------------------------

export type PlaceholderVariant = "default" | "terra" | "ochre" | "forest";

export interface HubImage {
  /** Path under /public (e.g. "/images/hubs/nigeria/farm-gate.jpg"). Omit for a placeholder. */
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
      "Clean energy and resilient food systems — cooking food without destroying trees.",
    description: [
      "The Nabahya Food Institute (NFI) is a non-profit based in the Democratic Republic of Congo that brings local farmers together in cooperatives — mitigating the cycle of poverty, starvation, and climate change while promoting access to clean energy and resilient food systems.",
      "NFI is a grant award winner of the Water and Energy for Food Grand Challenge for Development (WE4F), an international initiative supported by Germany's BMZ, the European Union, the Netherlands, Norad, Sida, and USAID. Its field activities span regenerative agriculture, clean energy, reforestation and conservation, and rural women's empowerment.",
      "The model is a circular economy: smallholder farmers supply crop residues and biomass as briquette raw material and receive payment — or briquettes — in return. Compared to charcoal and firewood, the innovation saves each farming family about $27 per month.",
    ],
    focus: [
      "Regenerative agriculture",
      "Clean energy",
      "Reforestation & conservation",
      "Rural women's empowerment",
    ],
    heroImage: {
      src: "/images/hubs/drc/women-at-work.jpeg",
      alt: "The NFI briquette production team in protective gear at the workshop in Uvira",
    },
    accent: "border-t-green",
    projects: [
      {
        slug: "briquette-production",
        name: "Briquette Production",
        summary: "Clean cooking fuel made from agricultural waste.",
        baseImage: {
          src: "/images/hubs/drc/briquettes-production.jpeg",
          alt: "Briquette production from agricultural waste at NFI",
        },
        gallery: [
          {
            src: "/images/hubs/drc/briquettes-machines.jpg",
            alt: "Briquette pressing machines",
          },
          {
            src: "/images/hubs/drc/women-at-work.jpeg",
            alt: "The briquette production team in protective gear",
          },
          {
            src: "/images/hubs/drc/briquettes-1.jpeg",
            alt: "Finished briquettes drying",
          },
          {
            src: "/images/hubs/drc/briquettes-2.jpeg",
            alt: "Briquettes ready for distribution",
          },
          {
            src: "/images/hubs/drc/briquettes-4.jpg",
            alt: "Briquette production in progress",
          },
          {
            src: "/images/hubs/drc/selling-point.jpeg",
            alt: "NFI briquette selling point — Briquettes Écologiques Nabahya",
          },
        ],
        description: [
          "NFI manufactures sustainable cooking fuel from agricultural waste — crop residues, biomass, dead leaves, palm shells, and maize stalks. The innovation brings a unique approach: cooking food without destroying trees.",
          "Briquettes reduce household cooking energy expenses, avoid air pollution, protect natural resources, empower women, and help consumers save time and money — about $27 per month per family compared to charcoal and firewood.",
          "To achieve a circular economy, smallholder farmers supply the raw materials to NFI and receive payment, or briquettes, in return. Ambassador sellers distribute the briquettes through local selling points like the one in Uvira.",
        ],
      },
      {
        slug: "clean-energy-cookers",
        name: "Solar Cookers & Clean Stoves",
        summary: "Box solar cookers and efficient stoves for smoke-free kitchens.",
        baseImage: {
          src: "/images/hubs/drc/solar-cookers.jpg",
          alt: "Box solar cookers and clean cookstoves ready for distribution",
        },
        gallery: [
          {
            src: "/images/hubs/drc/solar-jikos.jpg",
            alt: "Solar jikos lined up for distribution",
          },
          {
            src: "/images/hubs/drc/solar-agwa-stove.jpg",
            alt: "Box solar cooker and Agwa stove",
          },
        ],
        description: [
          "Alongside briquettes, NFI builds and distributes box solar cookers and efficient clean stoves — cutting fuel needs further and taking smoke out of the kitchen.",
          "Together with briquettes, these technologies reduce deforestation pressure, lower household costs, and protect the health of the women and children who do most of the cooking.",
        ],
      },
      {
        slug: "bio-fertilizer",
        name: "Bio-fertilizer & Bio-pesticide",
        summary: "Briquette ash and biochar boosting yields by ~150%.",
        baseImage: {
          src: "/images/hubs/drc/beneficiaries-1.jpg",
          alt: "Farmers with bio-fertilizer inputs",
        },
        gallery: [
          {
            src: "/images/hubs/drc/beneficiaries-2.jpeg",
            alt: "Beneficiary farmers with organic inputs",
          },
          {
            src: "/images/hubs/drc/impact-luvungi.jpeg",
            alt: "Communicating impact with farmers in Luvungi",
          },
        ],
        description: [
          "NFI's briquettes also help farmers' yields: when briquette ashes are mixed with human urine, manure, and loaded biochar, crop yields increase by about 150% (p ≤ 0.05) compared to local practice on soil without biochar (60.4%).",
          "Producing these organic fertilizers and pesticides locally cuts input costs and reduces dependence on imported chemical fertilizers — while keeping the whole value chain in the community.",
        ],
      },
      {
        slug: "farmer-field-schools",
        name: "Farmer Field Schools",
        summary: "Teaching biochar techniques to small-scale farmers.",
        baseImage: {
          src: "/images/hubs/drc/field-school-lubarika.jpeg",
          alt: "Farmer field school session at Lubarika",
        },
        gallery: [
          {
            src: "/images/hubs/drc/field-school-1.jpg",
            alt: "Farmer field school — champ école paysan",
          },
          {
            src: "/images/hubs/drc/field-school-2.jpeg",
            alt: "Farmers learning in the field",
          },
          {
            src: "/images/hubs/drc/field-school-3.jpeg",
            alt: "Farmer field school training session",
          },
          {
            src: "/images/hubs/drc/beneficiaries-lubarika-1.jpeg",
            alt: "Beneficiaries at Lubarika",
          },
        ],
        description: [
          "NFI's farmer field schools (champs écoles paysans) teach small-scale farmers — the majority of them women — the techniques of using biochar and organic inputs to increase their agricultural yields.",
          "Farmers learn by doing, on real plots at sites like Lubarika, so knowledge spreads farmer-to-farmer through the cooperatives rather than flowing one way from experts.",
        ],
      },
      {
        slug: "womens-cooperatives",
        name: "Rural Women's Empowerment",
        summary: "Women leading production, cooperatives, and income.",
        baseImage: {
          src: "/images/hubs/drc/beneficiaries-lubarika-2.jpeg",
          alt: "Women beneficiaries at a field school in Lubarika",
        },
        gallery: [
          {
            src: "/images/hubs/drc/beneficiaries-lubarika-3.jpeg",
            alt: "Beneficiaries gathered at Lubarika",
          },
          {
            src: "/images/hubs/drc/women-at-work.jpeg",
            alt: "Women on the briquette production line",
          },
          {
            src: "/images/hubs/drc/briquettes-3.jpg",
            alt: "Briquette production at the workshop",
          },
        ],
        description: [
          "Rural women's empowerment runs through everything NFI does: women make up the majority of the cooperative members, the field-school students, and the briquette production workforce.",
          "By organising farmers into cooperatives and putting women at the centre of production and income, the hub strengthens food sovereignty while shifting who holds economic power in the community.",
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
    // NOTE: Mariam is writing an updated story about her work at Maripha Farms.
    // Replace these paragraphs with her text when it arrives.
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
      src: "/images/hubs/nigeria/farm-gate.jpg",
      alt: "The gate of Maripha Farms in Kwara State",
    },
    accent: "border-t-terra",
    projects: [
      {
        slug: "demonstration-farm",
        name: "Integrated Organic Demonstration Farm",
        summary: "A whole-system farm where nothing is wasted.",
        baseImage: {
          src: "/images/hubs/nigeria/farm-gate.jpg",
          alt: "The entrance gate of Maripha Farms",
        },
        gallery: [
          {
            src: "/images/hubs/nigeria/produce-1.png",
            alt: "Fresh habanero peppers harvested at Maripha Farms",
          },
          {
            src: "/images/hubs/nigeria/produce-2.png",
            alt: "Farm produce from Maripha Farms",
          },
          {
            src: "/images/hubs/nigeria/produce-3.png",
            alt: "Farm produce from Maripha Farms",
          },
          {
            src: "/images/hubs/nigeria/produce-4.png",
            alt: "Farm produce from Maripha Farms",
          },
          {
            src: "/images/hubs/nigeria/produce-5.png",
            alt: "Farm produce from Maripha Farms",
          },
          {
            src: "/images/hubs/nigeria/produce-6.png",
            alt: "Farm produce from Maripha Farms",
          },
          {
            src: "/images/hubs/nigeria/produce-7.png",
            alt: "Farm produce from Maripha Farms",
          },
        ],
        description: [
          "The 15-acre farm cultivates a diverse mix of crops — rice, maize, millet, soya beans, groundnut, tomatoes, pepper, yam, sweet potatoes, cashew, palm, and cassava — alongside livestock including tilapia, chickens, goats, and rabbits.",
          "Following the Songhai model of integrated, regenerative agriculture, the farm experiments with azolla and black soldier fly larvae for feed production, closing loops so that the waste from one system becomes an input for the next.",
        ],
      },
      {
        slug: "school-farm-tours",
        name: "School Farm Tours",
        summary: "Secondary-school students learning agriculture hands-on.",
        baseImage: {
          src: "/images/hubs/nigeria/school-tour-1.jpg",
          alt: "Secondary-school students visiting Maripha Farms under the cashew trees",
        },
        gallery: [
          {
            src: "/images/hubs/nigeria/mef-1.jpeg",
            alt: "Mariam showing students a rabbit during a farm tour",
          },
          {
            src: "/images/hubs/nigeria/school-tour-2.jpg",
            alt: "Students on a guided tour of the farm",
          },
          {
            src: "/images/hubs/nigeria/school-tour-3.jpg",
            alt: "Students exploring Maripha Farms",
          },
          {
            src: "/images/hubs/nigeria/school-tour-4.jpg",
            alt: "Students visiting the farm structures",
          },
          {
            src: "/images/hubs/nigeria/school-tour-5.jpg",
            alt: "School group touring the farm",
          },
          {
            src: "/images/hubs/nigeria/school-tour-6.jpg",
            alt: "Students during a farm tour",
          },
          {
            src: "/images/hubs/nigeria/mef-2.jpeg",
            alt: "Farm tour moment at Maripha Farms",
          },
          {
            src: "/images/hubs/nigeria/mef-3.jpeg",
            alt: "Farm tour moment at Maripha Farms",
          },
          {
            src: "/images/hubs/nigeria/mef-4.jpeg",
            alt: "Farm tour moment at Maripha Farms",
          },
        ],
        description: [
          "Maripha Farms hosts secondary-school students for hands-on farm tours — walking the cashew orchards, meeting the livestock, and seeing integrated organic agriculture working as a living system.",
          "The tours are part of the hub's mission to develop young people as agents of change: a generation that sees farming as science, enterprise, and opportunity — not a last resort.",
        ],
      },
      {
        slug: "value-addition",
        name: "Value Addition — Maripha Farm Products",
        summary: "Branded garri and catfish, from farm to table.",
        baseImage: {
          src: "/images/hubs/nigeria/maripha-products.jpeg",
          alt: "Maripha Farm branded products — Ijebu garri, yellow garri, and dried catfish",
        },
        gallery: [
          {
            src: "/images/hubs/nigeria/outreach-children.jpg",
            alt: "Mariam with children holding seedlings on the farm",
          },
        ],
        description: [
          "The hub processes its harvests into branded, 100% organic products — Ijebu garri, yellow garri, and packaged dried catfish — sold under the Maripha Farm label with Chakula Bora's people-planet-profit mark.",
          "Through the partnership with Maripha Cuisine, the farm links directly to the table. Value addition keeps more income in the community and demonstrates a viable, replicable business model for smallholder farmers across the region.",
        ],
      },
    ],
  },

  // -------------------------------------------------------------- KENYA ----
  {
    slug: "kenya",
    name: "Kamser Seka Widows Community Support Initiative",
    shortName: "Kenya Hub",
    country: "Kenya",
    city: "Kendu Bay",
    region: "Homa Bay County",
    flag: "🇰🇪",
    leader: "Mary Omega",
    leaderRole: "Founder & Director, KSWCSI",
    leaderPhoto: {
      src: "/images/people/team/mary-omega.jpg",
      alt: "Mary Omega",
    },
    tagline: "Rebuilding hope, restoring dignity — women-led and community-rooted.",
    description: [
      "Kamser Seka Widows Community Support Initiative (KSWCSI) is a women-led, community-rooted organisation based in Kendu Bay, Homa Bay County. It works with widow chama groups, young mothers, youth, and vulnerable households to restore dignity, strengthen livelihoods, and build climate-resilient communities.",
      "Communities in Kendu Bay face persistent poverty, environmental degradation, and economic marginalisation — with widows and youth most affected. Heavy reliance on charcoal and firewood drives deforestation, high fuel costs, and indoor air pollution that harms the health of women and children.",
      "KSWCSI's work is grounded in a triple bottom line — People, Planet, and Productivity — ensuring every intervention improves lives, protects the environment, and generates income.",
      "“Every widow, young mother, and vulnerable family deserves a second chance — to heal, to thrive, and to lead. Our mission is to nurture that journey.” — Mary Omega, Founder & Director",
    ],
    focus: [
      "Widow chama groups",
      "Clean cookstoves & briquettes",
      "Sustainable agriculture",
      "Youth & young mothers",
    ],
    heroImage: {
      src: "/images/hubs/kenya/widows-cookstoves.jpg",
      alt: "Widows' group gathered around clean cookstoves in Kendu Bay",
    },
    accent: "border-t-ochre",
    projects: [
      {
        slug: "clean-cookstoves",
        name: "Clean Cookstoves & Briquettes",
        summary: "Climate-friendly jikos replacing charcoal and firewood.",
        baseImage: {
          src: "/images/hubs/kenya/widows-cookstoves.jpg",
          alt: "Community members with climate-friendly cookstoves (jikos)",
        },
        gallery: [
          {
            src: "/images/hubs/kenya/community-1.jpg",
            alt: "Community gathering in Kendu Bay",
          },
          {
            src: "/images/hubs/kenya/widows-meeting-1.jpg",
            alt: "Widows' group meeting",
          },
          {
            src: "/images/hubs/kenya/widows-meeting-2.jpg",
            alt: "Widows' group session in Kendu Bay",
          },
        ],
        description: [
          "Most households in Kendu Bay rely on charcoal and firewood for cooking — driving deforestation, high fuel costs, and indoor air pollution that causes respiratory and eye problems, especially for women and children.",
          "Climate-friendly cookstoves (jikos) and briquettes offer a locally appropriate, low-cost, and scalable solution — addressing clean energy access, climate mitigation, and household health in one intervention, while creating income opportunities for the widows who make and sell them.",
        ],
      },
      {
        slug: "widow-chama-empowerment",
        name: "Widow Chama Empowerment",
        summary: "Skills, savings, and sustainable farming for widows.",
        baseImage: {
          src: "/images/hubs/kenya/composting-training.jpg",
          alt: "Composting training with a widows' chama group",
        },
        gallery: [
          {
            src: "/images/hubs/kenya/widows-meeting-1.jpg",
            alt: "Chama group gathered for training",
          },
          {
            src: "/images/hubs/kenya/school-garden-1.jpg",
            alt: "Vegetable plot cultivated by the group",
          },
          {
            src: "/images/hubs/kenya/school-garden-5.jpg",
            alt: "Community garden beds in Kendu Bay",
          },
        ],
        description: [
          "Unemployment and limited access to skills, capital, and markets trap many widows and youth in cycles of poverty — despite strong willingness to engage in income-generating work.",
          "KSWCSI works through widow chama groups to build practical, marketable skills: composting, sustainable vegetable production, and group savings that turn willingness into stable livelihoods and restored dignity.",
        ],
      },
      {
        slug: "chakula-bora-schools",
        name: "Chakula Bora School Gardens",
        summary: "Pupils growing good food at school.",
        baseImage: {
          src: "/images/hubs/kenya/school-garden-pupils-1.jpg",
          alt: "Pupils preparing a school garden plot",
        },
        gallery: [
          {
            src: "/images/hubs/kenya/school-garden-pupils-2.jpg",
            alt: "Pupils working in the school garden",
          },
          {
            src: "/images/hubs/kenya/school-garden-pupils-3.jpg",
            alt: "Students tending garden beds",
          },
          {
            src: "/images/hubs/kenya/school-garden-2.jpg",
            alt: "School garden plot growing vegetables",
          },
          {
            src: "/images/hubs/kenya/school-garden-3.jpg",
            alt: "Young crops in the school garden",
          },
          {
            src: "/images/hubs/kenya/school-garden-4.jpg",
            alt: "School garden beds",
          },
          {
            src: "/images/hubs/kenya/chakula-bora-schools.png",
            alt: "Chakula Bora schools programme",
          },
        ],
        description: [
          "Through the Chakula Bora schools programme, pupils learn practical agro-ecology by growing good food on their own school plots — from preparing beds to harvest.",
          "The gardens supply fresh vegetables and plant a generation-deep understanding that healthy food and healthy land go together.",
        ],
      },
      {
        slug: "world-food-day",
        name: "World Food Day Showcases",
        summary: "Celebrating local food systems at county events.",
        baseImage: {
          src: "/images/hubs/kenya/wfd-ks-1.jpg",
          alt: "KSWCSI members showcasing produce at a World Food Day event",
        },
        gallery: [
          {
            src: "/images/hubs/kenya/wfd-schools-team.jpg",
            alt: "The Chakula Bora schools team at World Food Day",
          },
          {
            src: "/images/hubs/kenya/wfd-1.jpg",
            alt: "World Food Day exhibition stand",
          },
          {
            src: "/images/hubs/kenya/wfd-ks-2.jpg",
            alt: "Members at the World Food Day showground",
          },
          {
            src: "/images/hubs/kenya/wfd-ks-3.jpg",
            alt: "World Food Day activities",
          },
          {
            src: "/images/hubs/kenya/wfd-ks-4.jpg",
            alt: "Produce display at World Food Day",
          },
          {
            src: "/images/hubs/kenya/wfd-seka-1.jpg",
            alt: "Kamser Seka members at World Food Day",
          },
          {
            src: "/images/hubs/kenya/wfd-seka-2.jpg",
            alt: "Kamser Seka group at the event",
          },
        ],
        description: [
          "KSWCSI brings its members — widows, youth, and school teams — to World Food Day celebrations at the Kendu Bay Showground and beyond, exhibiting produce and connecting with partners across the county.",
          "For many members these events are a first public platform: a place to sell, to learn from other farmers, and to be recognised for the enterprise they have built.",
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
