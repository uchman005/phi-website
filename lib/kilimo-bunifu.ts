// ---------------------------------------------------------------------------
// Kilimo Bunifu — every edition of the series, in one typed file.
//
// Drives /programs/kilimo-bunifu (the series hub), one page per edition at
// /programs/kilimo-bunifu/<slug>, the countdown/"time ago" clocks, the
// homepage banner and the sitemap. To add an edition, add an entry here and
// a folder of images under public/images/kilimo-bunifu/<slug>/.
//
// Sources: Kilimo Bunifu overview; ICAT 9 poster and KB I session collage
// (2020); KB II agenda and April 2022 concept note (2022); "Thee Next Gen
// Awakening: Africa 4.0" concept, KB III flyer and FGD 1 report (2026).
// Anything not in those sources is left null and hidden — never guessed.
// ---------------------------------------------------------------------------

import type { EventWindow } from "@/lib/event-time";

export interface Person {
  name: string;
  /** Title and organisation as given in the source. */
  affiliation?: string;
  country?: string;
  /** Talk title, where the source gives one. */
  talk?: string;
  photo?: string;
  href?: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  detail?: string;
}

export interface BreakoutTeam {
  name: string;
  room: string;
  meaning: string;
  focus: string;
  slogan?: string;
  chant?: string;
  card?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  /** Landscape cards span two columns on wide screens. */
  wide?: boolean;
}

export interface Fgd {
  label: string;
  audience: string;
  description: string;
  status: "completed" | "upcoming" | "tbc";
  /** ISO date, or null when not yet supplied. */
  date: string | null;
  place: string | null;
  facilitator?: string;
  summary?: string;
}

export interface DayStep {
  title: string;
  line: string;
}

export interface Stat {
  value: string;
  text: string;
  /** Link to the published source. TODO(founder): supply sources. */
  source: string | null;
}

export interface University {
  name: string;
  place: string;
}

export interface KilimoBunifuEdition {
  slug: string;
  numeral: "I" | "II" | "III";
  /** Edition name, e.g. "Thee Next Gen Awakening – Africa 4.0". */
  title: string;
  /** What the edition set out to talk about. */
  theme: string;
  strapline?: string;
  dates: EventWindow;
  /** Shown next to the dates, e.g. "Online" or "Hybrid · Bulawayo, Zimbabwe". */
  format: string;
  icat: {
    edition: string;
    dates?: string;
    place?: string;
    organiser?: string;
    theme?: string;
    url?: string;
  };
  /** Card/hero image and its alt text; also used for link previews. */
  image: { src: string; alt: string; width: number; height: number };
  summary: string[];
  /** How the edition's idea took shape, if it changed during planning. */
  origin?: string;
  host?: Person;
  facilitators?: Person[];
  supporters?: string[];
  /** "Panelists" for KB I, "Keynote speakers" for KB II. */
  peopleHeading?: string;
  people?: Person[];
  facts?: string[];
  region?: { label: string; countries: string[] };
  agenda?: { heading: string; note?: string; items: AgendaItem[] };
  breakouts?: BreakoutTeam[];
  gallery?: GalleryImage[];
  followUps?: { heading: string; items: string[]; links?: { label: string; href: string }[] };
  // --- Upcoming-edition extras (KB III) ---
  quote?: { text: string; by: string };
  intro?: string;
  stats?: Stat[];
  fgds?: Fgd[];
  findings?: { heading: string; source: string; items: string[]; question?: string };
  daySteps?: DayStep[];
  lead?: Person;
  team?: Person[];
  universities?: University[];
  afterwards?: string[];
  /** null until confirmed by the ICAT Local Organising Committee. */
  dateConfirmed: boolean | null;
  /** Livestream platform; null until announced. */
  livestream: string | null;
  /** Show the engagement form on this edition's page. */
  registration?: boolean;
}

const IMG = "/images/kilimo-bunifu";

export const kilimoBunifuEditions: KilimoBunifuEdition[] = [
  {
    slug: "2020",
    numeral: "I",
    title: "Kilimo Bunifu I",
    theme: "Integration of appropriateness in medium-scale farming enterprises",
    dates: { startDate: "2020-11-23", endDate: "2020-11-24", timeZone: "UTC" },
    format: "Online · two days",
    icat: { edition: "9th ICAT" },
    image: {
      src: `${IMG}/2020/cards/welcome.jpg`,
      alt: "Opening slide: Welcome to Kilimo Bunifu — hosted by Passion of Hope, facilitated by Alchemy Inspiration, 23–24 Nov 2020",
      width: 1446,
      height: 1030,
    },
    summary: [
      "The first Kilimo Bunifu ran online over two days as part of the 9th International Conference on Appropriate Technology. About 27 people took part — farmers, researchers, financiers, economists, extension workers and policymakers.",
      "The conversation started from what was holding farming back: what stops farmers using sustainable methods, where the gaps in resources are, how local knowledge and appropriate technology fit into farming today, how farmers and markets can work together more fairly, and how crops can become products that earn more. The talks ranged across land, water, storage, roads, finance, processing and technology.",
    ],
    host: {
      name: "Brian Stephenson",
      affiliation: "President, Passion of Hope International",
      photo: `${IMG}/2020/panelists/brian-stephenson.jpg`,
      href: "/team",
    },
    facilitators: [
      { name: "Dr Puleng Makhoalibe", affiliation: "Alchemy Inspiration" },
    ],
    supporters: ["TechnoServe (funding support)"],
    peopleHeading: "Panelists",
    people: [
      { name: "Fr. Godfrey Nzamujo", affiliation: "Songhai Centre", country: "Benin", photo: `${IMG}/2020/panelists/godfrey-nzamujo.jpg` },
      { name: "Dr. Million Belay", affiliation: "General Coordinator, AFSA", country: "Uganda", talk: "Adapting agriculture to change in Africa — the path to agroecology", photo: `${IMG}/2020/panelists/million-belay.jpg` },
      { name: "Dr. Siima Bakengesa", affiliation: "Forest Production Research", country: "Tanzania", photo: `${IMG}/2020/panelists/siima-bakengesa.jpg` },
      { name: "Nelson Chisenga", affiliation: "Agricultural economist, NIRAS International Consulting", country: "Zambia" },
      { name: "H.E. Josefa Leonel Correia Sacko", affiliation: "Commissioner for Rural Economy and Agriculture, African Union Commission", country: "Angola", photo: `${IMG}/2020/panelists/josefa-correia.jpg` },
      { name: "Dr. Jimmy Smith", affiliation: "ILRI", country: "Kenya", photo: `${IMG}/2020/panelists/jimmy-smith.jpg` },
      { name: "Dr. Thomas Jayne", affiliation: "Adviser to ADB", country: "USA" },
      { name: "Dr. Adijah Ali-Olubandwa", affiliation: "Egerton University", country: "Kenya", talk: "Partnership and resource mobilisation for sustainable agriculture", photo: `${IMG}/2020/panelists/adijah-ali-olubandwa.jpg` },
      { name: "Prof. Samuel Gudu", affiliation: "Vice Chancellor, Rongo University", country: "Kenya", photo: `${IMG}/2020/panelists/samuel-gudu.jpg` },
    ],
    breakouts: [
      {
        name: "Triple P",
        room: "Breakaway Room 1",
        meaning: "People, planet & profit",
        focus: "People, profit and planet",
        slogan: "Progressive farming for prosperity",
        card: `${IMG}/2020/cards/team-triple-p.jpg`,
      },
      {
        name: "Jabali",
        room: "Breakaway Room 2",
        meaning: "Firm foundation — strong rock",
        focus: "Partnerships",
        slogan: "Strong and lasting partnerships",
        chant: "Zangalewa!",
        card: `${IMG}/2020/cards/team-jabali.jpg`,
      },
      {
        name: "Chakula",
        room: "Breakaway Room 3",
        meaning: "Food",
        focus: "An online platform to share food knowledge",
        slogan: "Good food for everyone — Chakula Bora Kwa Wote",
        chant: "Chakula Boraaa!",
        card: `${IMG}/2020/cards/team-chakula.jpg`,
      },
    ],
    gallery: [
      { src: `${IMG}/2020/cards/session.jpg`, alt: "Zoom gallery of Kilimo Bunifu participants, many waving", caption: "Participants on the Zoom call", wide: true },
      { src: `${IMG}/2020/cards/million-belay-talk.jpg`, alt: "Title slide: Adapting agriculture to change in Africa — the path to agroecology, Million Belay (PhD), General Coordinator, AFSA", caption: "Dr. Million Belay's talk" },
      { src: `${IMG}/2020/cards/insights-room-2.jpg`, alt: "Sticky-note board titled Breakaway Room 2: Insights from the morning", caption: "Breakaway Room 2 — insights from the morning", wide: true },
      { src: `${IMG}/2020/cards/challenges-room-1.jpg`, alt: "Board of 'How might we…' challenge statements from Breakaway Room 1", caption: "Room 1 — challenge statements (How might we…)" },
      { src: `${IMG}/2020/cards/challenges-room-2.jpg`, alt: "Board of 'How might we…' challenge statements from Breakaway Room 2", caption: "Room 2 — challenge statements" },
      { src: `${IMG}/2020/cards/challenges-room-3.jpg`, alt: "Board of 'How might we…' challenge statements from Breakaway Room 3", caption: "Room 3 — challenge statements" },
      { src: `${IMG}/2020/icat-9-poster.jpg`, alt: "ICAT 9 poster: Two-day interactive workshop, Integration of appropriateness in medium scale farming enterprises, with the list of panelists, November 23–24, 2020", caption: "The ICAT 9 workshop poster" },
    ],
    followUps: {
      heading: "What came out of it",
      items: [
        "The three teams kept working through December 2020 and drafted a five-year plan for 2021–2026: an online knowledge platform, regional hubs to train and support farmers, and partnerships between farmers, researchers, businesses and policymakers. These were plans and targets, not results.",
        "The plan also proposed a healthy-food brand called Chakula Bora — \"good food\" — growing out of the Chakula team.",
      ],
      links: [{ label: "Chakula Bora today", href: "/programs/chakula-bora" }],
    },
    dateConfirmed: true,
    livestream: null,
  },
  {
    slug: "2022",
    numeral: "II",
    title: "Kilimo Bunifu II",
    theme: "Ecological approaches to food security and peace in the Sahel, from the small-holder farmer up",
    dates: { startDate: "2022-11-21", endDate: "2022-11-21", timeZone: "UTC" },
    format: "Virtual",
    icat: { edition: "10th ICAT" },
    image: {
      src: `${IMG}/2022/sahel-map.jpg`,
      alt: "Map of the Sahel belt across West Africa, from Senegal and Mauritania to Chad and Sudan, shaded by dryland zone",
      width: 825,
      height: 468,
    },
    summary: [
      "Kilimo Bunifu II ran alongside the 10th International Conference on Appropriate Technology and turned to food, land and peace — with particular attention to the Sahel.",
      "Its Sahel West session on 21 November 2022 opened with remarks from PHI President Brian Stephenson and the video presentation \"Cries from the Sahel\", followed by keynote talks and three rounds of breakout work: framing, analysis and solutions.",
    ],
    origin:
      "The idea took shape in April 2022 as \"African Regenerative Agriculture in Practice: A celebration of best practices\" — a showcase of farming projects with Chakula Bora awards. As planning went on, the focus moved to food, land and peace in the Sahel.",
    peopleHeading: "Keynote speakers",
    people: [
      { name: "Prof. O.A. Omotesho", affiliation: "University of Ilorin", country: "Nigeria", talk: "Integration and resilience: the keys to food sovereignty in Northern Nigeria and Niger", photo: `${IMG}/2022/speakers/oa-omotesho.jpg` },
      { name: "Dr. Vide Adedayo", affiliation: "University of Lagos", country: "Nigeria", talk: "The trajectory of resource governance: a pathway to de-escalating farmer–herder conflicts and enhancing food security in the African Sahel", photo: `${IMG}/2022/speakers/vide-adedayo.jpg` },
      { name: "Dr. Ousseni Diallo", affiliation: "Green Cross", country: "Burkina Faso", talk: "No more studies! What are the implementation strategies that will ensure food sovereignty and economic resilience in the Sahel?", photo: `${IMG}/2022/speakers/ousseni-diallo.jpg` },
      // TODO(founder): confirm the spelling "Akinyaode" (as printed on the agenda).
      { name: "Dr. Akinyinka Akinyaode", affiliation: "University of Leiden", country: "Netherlands", talk: "Food vulnerabilities and agricultural innovations for self-sufficiency in the Sahel", photo: `${IMG}/2022/speakers/akinyinka-akinyaode.jpg` },
    ],
    facts: [
      "Keynote speakers from Sudan, Burkina Faso, Nigeria, Kenya and the Netherlands",
      "Posters in English, French and Arabic",
      "Plenary in English with French translation; small groups organised by language, each with a bilingual facilitator",
      "Six breakout teams",
      "Participation certificates (December 2022) and Professional Development Units",
    ],
    region: {
      label: "Sahel West",
      countries: ["Mauritania", "Senegal", "Gambia", "Mali", "Burkina Faso", "Niger", "Nigeria", "Cameroon", "Chad"],
    },
    agenda: {
      heading: "Sahel West session · 21 November 2022",
      note: "All times GMT",
      items: [
        { time: "08:00", title: "Virtual pre-event", detail: "Platform open for informal chat" },
        { time: "08:30", title: "Welcome and opening remarks", detail: "Brian Stephenson, President, Passion of Hope International" },
        { time: "09:00", title: "\"Cries from the Sahel\"", detail: "A video presentation" },
        { time: "09:45", title: "Keynote presentations and discussion" },
        { time: "10:45", title: "Break" },
        { time: "11:15", title: "Breakout rooms — Part 1: Framing" },
        { time: "12:15", title: "Lunch" },
        { time: "13:15", title: "Breakout rooms — Part 2: Analysis" },
        { time: "14:15", title: "Break" },
        { time: "14:30", title: "Breakout rooms — Part 3: Solutions" },
        { time: "15:45", title: "Plenary — group reports" },
        { time: "16:45", title: "The way forward" },
      ],
    },
    gallery: [
      { src: `${IMG}/2022/sahel-map.jpg`, alt: "Map of the Sahel belt across West Africa, shaded by dryland zone", caption: "The Sahel belt (map: Millennium Ecosystem Assessment)", wide: true },
    ],
    followUps: {
      heading: "What came after",
      items: [
        "The team listed the threads to keep pulling on: agriculture for peace, easing land tensions, the role of aid agencies, the role of governments in farming and land policy, and making the voices of the Sahel heard.",
        "Participants were to form a Chakula Bora Network, and a Chakula Bora Speaker Series followed in 2023.",
      ],
      links: [{ label: "Chakula Bora Digital Network", href: "/programs/chakula-bora" }],
    },
    dateConfirmed: true,
    livestream: null,
  },
  {
    slug: "2026",
    numeral: "III",
    title: "Thee Next Gen Awakening – Africa 4.0",
    theme: "Youth agency towards sovereignty in Africa",
    strapline: "Kilimo Bunifu III · One-day hybrid workshop",
    dates: { startDate: "2026-11-24", endDate: "2026-11-24", timeZone: "Africa/Harare" },
    format: "Hybrid · Bulawayo, Zimbabwe + online",
    icat: {
      edition: "12th ICAT",
      dates: "24–27 November 2026",
      place: "Bulawayo, Zimbabwe",
      organiser: "National University of Science and Technology (NUST)",
      theme: "Harnessing Appropriate Technologies for Sustainable Development: Empowering Communities, Bridging Gaps and Driving Inclusive Growth",
      url: "https://appropriatetech.net/index.php",
    },
    image: {
      src: `${IMG}/2026/share.jpg`,
      alt: "Thee Next Gen Awakening – Africa 4.0 emblem: a young African rising from a cracked shell, with the words Youth agency towards sovereignty in Africa",
      width: 718,
      height: 376,
    },
    quote: { text: "Whoever feeds you, controls you.", by: "Thomas Sankara" },
    intro:
      "Africa has the land and the world's youngest population. For three months we listened to young people, professionals and leaders. On 24 November we put that evidence in front of policymakers — and ask for commitments.",
    summary: [
      "This time young people are at the centre. Through focus group discussions, interviews and a student questionnaire, Kilimo Bunifu III asks what young Africans know, believe and want to do about food sovereignty, land, governance and value-addition — then brings that evidence into a room where policy and technology decisions are usually made without them.",
    ],
    stats: [
      { value: "~72M", text: "young Africans are not in education, employment or training — two-thirds are young women.", source: null },
      { value: "55%", text: "of young Africans surveyed in 2025 had considered moving abroad.", source: null },
      { value: "~42%", text: "By 2030, Africa will be home to about 42% of the world's youth.", source: null },
    ],
    fgds: [
      {
        label: "FGD 1",
        audience: "Young people",
        description: "Youth and young professionals shaping what comes next.",
        status: "completed",
        date: "2026-08-13",
        place: "Nakuru, Kenya",
        facilitator: "Deon Orina",
        summary:
          "Young people see Africa as rich in assets but weak at turning them into locally owned value. They want accountable leadership, fair pay for African labour, a real voice in decisions — and agriculture presented as modern, scalable enterprise.",
      },
      {
        label: "FGD 2",
        audience: "Professionals",
        description: "Educators, practitioners, NGOs, technologists and researchers.",
        status: "completed",
        date: null, // TODO(founder): FGD 2 date and place
        place: null,
      },
      {
        label: "FGD 3",
        audience: "Leaders",
        description: "Community leaders, policymakers and entrepreneurs.",
        status: "completed",
        date: null, // TODO(founder): FGD 3 date and place
        place: null,
      },
    ],
    findings: {
      heading: "What young people told us",
      source: "FGD 1 · Nakuru, 13 August 2026 — areas of agreement",
      items: [
        "Africa has significant resources, talent and potential.",
        "The major challenge is not only what Africa possesses, but how effectively it converts those assets into locally retained value.",
        "Good governance, accountability and rule of law are central to the Africa participants want.",
        "Migration is driven strongly by opportunity, fair compensation, professional growth and functioning systems.",
        "Food and agricultural self-sufficiency remain important to the vision of a successful Africa, but agriculture needs to be made attractive and relevant to young people.",
      ],
      question: "What would make young Africans choose to build long-term careers and businesses on the continent?",
    },
    daySteps: [
      { title: "Welcome & framing", line: "The Africa 4.0 vision and the day's goals" },
      { title: "Evidence", line: "Testimony, video and survey findings" },
      { title: "Panel", line: "Panelists respond to the evidence" },
      { title: "Group work", line: "Groups set benchmarks toward Africa 4.0" },
      { title: "Commitments", line: "Personal commitments and December study groups" },
    ],
    lead: {
      name: "Juliet Ngaji",
      affiliation: "Program Lead, Kilimo Bunifu III",
      photo: "/images/people/team/juliet-ngaji.jpg",
      href: "/team",
    },
    team: [
      { name: "Victor Ibeto", photo: "/images/people/team/victor.jpeg", href: "/team" },
      { name: "Mariam Olorundare", photo: "/images/people/team/mariam-olorundare.jpg", href: "/team" },
      { name: "Asli Nur" },
      { name: "Angel Kabelo" },
      { name: "Dr. Gabriel Opolot" },
      { name: "Brian Stephenson", photo: "/images/people/team/brian.jpg", href: "/team" },
    ],
    universities: [
      { name: "University of Ilorin", place: "Ilorin, Nigeria" },
      { name: "Tom Mboya University", place: "Homa Bay, Kenya" },
      { name: "Egerton University", place: "Nakuru, Kenya" },
    ],
    afterwards: [
      "Follow-on study groups, agreed during the Call to Action, meet in December.",
      "A podcast recap of the day, with further episodes from the study groups.",
      "A findings and outcomes report connecting the pre-workshop evidence to what was committed on the day.",
      "Participating students are updated on outcomes and added to the network.",
    ],
    // TODO(founder): set to true once the ICAT Local Organising Committee confirms 24 Nov.
    dateConfirmed: null,
    // TODO(founder): livestream platform, once chosen.
    livestream: null,
    registration: true,
  },
];

export function getEdition(slug: string): KilimoBunifuEdition | undefined {
  return kilimoBunifuEditions.find((e) => e.slug === slug);
}

/** Editions newest first. */
export function editionsNewestFirst(): KilimoBunifuEdition[] {
  return [...kilimoBunifuEditions].sort((a, b) =>
    b.dates.startDate.localeCompare(a.dates.startDate)
  );
}

/** The edition this site is currently promoting: the latest one. */
export function featuredEdition(): KilimoBunifuEdition {
  return editionsNewestFirst()[0];
}

export function editionHref(e: Pick<KilimoBunifuEdition, "slug">): string {
  return `/programs/kilimo-bunifu/${e.slug}`;
}
