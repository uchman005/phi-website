export type BlogPostBlock =
  | { type: "p"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "link"; href: string; label: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Display date, e.g. "13 August 2026". */
  date: string;
  /** Sort key (YYYY-MM-DD) — newest posts show first everywhere. */
  isoDate: string;
  author: string;
  tag: string;
  thumbnail: string;
  body: BlogPostBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "kilimo-bunifu-iii-begins-nakuru",
    title: "Kilimo Bunifu III begins: what young people told us in Nakuru",
    excerpt:
      "The first focus group of Kilimo Bunifu III heard young Africans describe a continent rich in assets but weak at turning them into locally owned value — and what they want instead.",
    date: "August 13, 2026",
    isoDate: "2026-08-13",
    author: "Kilimo Bunifu III team",
    tag: "Kilimo Bunifu",
    thumbnail: "/images/kilimo-bunifu/2026/share.jpg",
    // Source: KB3 First Focus Group Discussion Report (Nakuru, 13 Aug 2026).
    body: [
      {
        type: "p",
        text: "On 13 August 2026, young people and young professionals met in Nakuru, Kenya, for the first focus group discussion of Kilimo Bunifu III — Thee Next Gen Awakening: Africa 4.0. Facilitated by Deon Orina, it was the first listening point in a process that leads to a one-day hybrid workshop at the 12th International Conference on Appropriate Technology in Bulawayo, Zimbabwe, on 24 November.",
      },
      {
        type: "p",
        text: "The session was an open discussion rather than a presentation, built around four questions: how young Africans view Africa today; their biggest concerns and opportunities; why they might leave Africa and what would make them stay; and the kind of leadership they want.",
      },
      {
        type: "p",
        text: "Participants did not see Africa through a deficit lens. They described a continent rich in natural resources, human capital, culture, creative talent, agriculture and entrepreneurship — while questioning whether Africans have the systems, knowledge, capital and institutions to turn those assets into value that stays local.",
      },
      {
        type: "p",
        text: "Unemployment came up strongly, but not only as a grievance: several argued that it should push young people towards enterprise and innovation. They also raised a concern that young African start-ups can be sold to outside interests before they grow into locally owned businesses.",
      },
      {
        type: "p",
        text: "Migration, they said, is largely about opportunity, dignity and the value of labour — fair pay, professional recognition and functioning systems — rather than a rejection of Africa. Asked what they would do as presidents, they focused on transparency, accountability, the rule of law, tackling corruption, education and national debt.",
      },
      {
        type: "p",
        text: "Agriculture did not dominate the conversation. Where it came up, participants linked it to land, investment and food self-sufficiency — and suggested young people may engage more if it is presented as a modern, scalable, technology-enabled enterprise.",
      },
      {
        type: "p",
        text: "In short: young people see Africa as rich in assets but weak at turning them into locally owned value. They want accountable leadership, fair pay for African labour, a real voice in decisions — and agriculture presented as modern, scalable enterprise.",
      },
      {
        type: "p",
        text: "Kilimo Bunifu III is led by Program Lead Juliet Ngaji. The professionals' and leaders' conversations test these findings from other perspectives, and everything heard goes in front of policymakers on 24 November.",
      },
      { type: "link", href: "/programs/kilimo-bunifu/2026", label: "Kilimo Bunifu III — join the workshop" },
    ],
  },
  {
    slug: "press-release",
    title: "Press Release: Maripha Farms Activates the FEED Programme",
    excerpt:
      "A partnership between the University of Ilorin, Maripha Empowerment Foundation, and PHI moves from planning to implementation, designating Maripha Farms a Research and Incubator Center for regenerative agriculture.",
    date: "November 14, 2025",
    isoDate: "2025-11-14",
    author: "Brian Stephenson",
    tag: "Partnerships",
    thumbnail: "/images/blog/press-release-thumb.png",
    body: [
      {
        type: "p",
        text: "A collaborative partnership between the University of Ilorin, Maripha Empowerment Foundation, and Passion of Hope International is transitioning from planning to implementation. On November 5, 2025, the Faculty of Agriculture's Dean, Prof. Ogunlade Isreal, visited Maripha Farms to activate the Farmer Entrepreneurship and Ecosystem Development (FEED) programme.",
      },
      { type: "image", src: "/images/blog/press-release-1.png", alt: "Dean Prof. Ogunlade Isreal visiting Maripha Farms" },
      {
        type: "p",
        text: "The initiative builds on work begun by the previous Dean, Prof. Oluyemisi Bolajoko Fawoye, who championed discussions leading to a Memorandum of Understanding signed July 18, 2025, by Vice-Chancellor Prof. Wahab Olasupo Egbewole.",
      },
      {
        type: "p",
        text: "The five-year framework designates Maripha Farms as a Research and Incubator Center focusing on regenerative agricultural research, agribusiness incubation for youth and women, and practical training for students and farmers.",
      },
      { type: "image", src: "/images/blog/press-release-2.png", alt: "Maripha Farms FEED programme site" },
      {
        type: "p",
        text: "Leadership continuity was emphasized as essential: the dedication shown by Prof. Fawoye in laying the groundwork, and the immediate engagement by Prof. Isreal, demonstrate how sustainable development requires a continuous, collective mission.",
      },
      {
        type: "p",
        text: "The partnership aims to advance food sovereignty and youth empowerment in Kwara State through collaborative commitment.",
      },
    ],
  },
  {
    slug: "syprina-aumas-journey",
    title:
      "A Story of Hope, Resilience, and Renewal: Syprina Auma's Journey from Despair to Dignity",
    excerpt:
      "After losing her home to a storm, 75-year-old widow Syprina Auma partnered with PHI and the Kamser Seka Widows CBO to rebuild — gaining a safe home, clean water, and a kitchen garden.",
    date: "February 12, 2025",
    isoDate: "2025-02-12",
    author: "Brian Stephenson",
    tag: "Impact Story",
    thumbnail: "/images/blog/syprina-journey-thumb.jpg",
    body: [
      {
        type: "p",
        text: "In a remote village in Kendu Bay, Kenya, 75-year-old Syprina Auma struggled with rural poverty and loss following her husband's death a decade earlier. A devastating storm in March 2024 destroyed her fragile home, leaving her without shelter, clean water, or proper sanitation facilities. Her adult children, themselves impoverished, could not assist her.",
      },
      {
        type: "p",
        text: "Passion of Hope International partnered with Kamser Seka Widows CBO to rebuild homes for Syprina and another widow, Susan Atieno. The organization launched an international fundraising campaign to construct safe, sustainable housing rather than merely providing temporary shelter.",
      },
      { type: "image", src: "/images/blog/syprina-journey-1.jpg", alt: "Construction of Syprina Auma's new home" },
      {
        type: "p",
        text: "The reconstruction project faced time pressure from the approaching rainy season. Donors worldwide contributed generously to the effort. Local workers and volunteers built a two-room house equipped with a rainwater harvesting system and holding tank for water collection. A kitchen garden was established to enable Syprina to grow crops for her livelihood.",
      },
      { type: "image", src: "/images/blog/syprina-journey-2.jpg", alt: "Rainwater harvesting tank installed at Syprina Auma's home" },
      {
        type: "p",
        text: "Upon completion, Syprina emotionally expressed her gratitude, stating: “I never thought I would see this day...You have given me more than a home—you have given me my life back.”",
      },
      { type: "image", src: "/images/blog/syprina-journey-3.jpg", alt: "Syprina Auma's kitchen garden" },
      {
        type: "p",
        text: "The project's impact extends beyond physical infrastructure. The water system and garden provide sustainable resources, improving her quality of life and financial independence. PHI emphasizes that many others require similar assistance and calls for continued support to help vulnerable individuals in the region.",
      },
    ],
  },
  {
    slug: "medical-care-ndhiwa",
    title: "Join Us in Bringing Essential Medical Care to Ndhiwa, Kenya",
    excerpt:
      "On August 23–24, 2024, PHI hosted the Ndhiwa B Healthy Day, providing free medical care, health education, and NHIF awareness to over 4,000 residents of rural western Kenya.",
    date: "August 14, 2024",
    isoDate: "2024-08-14",
    author: "Brian Stephenson",
    tag: "Health",
    thumbnail: "/images/blog/medical-care-ndhiwa-thumb.jpg",
    body: [
      {
        type: "p",
        text: "On August 23–24, 2024, Passion of Hope International hosted the Ndhiwa B Healthy Day, an event dedicated to providing essential medical care to over 4,000 residents in rural western Kenya.",
      },
      {
        type: "p",
        text: "For the past three years, Ndhiwa B Healthy Day has been a beacon of hope, transforming the lives of individuals who otherwise have limited access to healthcare. From infants to the elderly, every age group has benefited from the care provided during this event.",
      },
      {
        type: "p",
        text: "This year, PHI took an active role in the initiative, working alongside collaborator Phoebe Odhiambo Owino — an Executive Public Health Nurse with experience at the Center for Disease Control Foundation and the Boston Public Health Commission.",
      },
      {
        type: "p",
        text: "The event's objectives spanned health education and awareness, free medical consultations, community health assessment, NHIF (National Health Insurance Fund) education, infectious and lifestyle disease awareness, personal health responsibility, healthcare practitioner exposure, and multi-sectoral collaboration to improve social services and healthcare standards in Ndhiwa.",
      },
      {
        type: "p",
        text: "Passion of Hope International oversaw the event, ensuring every donation funded the camp directly — working toward a socially empowered, healthier Ndhiwa community.",
      },
    ],
  },
];

/** Every post, newest first. */
export function postsNewestFirst(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.isoDate.localeCompare(a.isoDate));
}

export function getLatestPosts(count = 3): BlogPost[] {
  return postsNewestFirst().slice(0, count);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
