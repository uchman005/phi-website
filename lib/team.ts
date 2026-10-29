// ---------------------------------------------------------------------------
// Everyone on /team, grouped by section. To add someone: put their photo in
// public/images/people/team/ and add an entry to the right section below.
// ---------------------------------------------------------------------------

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  location?: string;
  /** Short bio shown under the role. */
  bio?: string;
}

export const teamSections: { heading: string; members: TeamMember[] }[] = [
  {
    heading: "Leadership",
    members: [
      {
        name: "Brian Stephenson",
        role: "President and Founder, Passion of Hope International. CEO, DHA East Africa, Ltd.",
        photo: "/images/people/team/brian.jpg",
        location: "USA",
      },
      {
        name: "Victor Ibeto",
        role: "Chief Operating Officer, Passion of Hope International. Attorney.",
        photo: "/images/people/team/victor.jpeg",
        location: "Benin",
      },
    ],
  },
  {
    heading: "Hub Leaders",
    members: [
      {
        name: "Mariam Olorundare",
        role: "President, Maripha Empowerment Foundation. Hub Leader. Training: Catering / Agro-ecology.",
        photo: "/images/people/team/mariam-olorundare.jpg",
        location: "Nigeria",
      },
      {
        name: "Guillain Nabahya",
        role: "Board Chair and Director, Nabahya Food Institute",
        photo: "/images/people/team/guillain-nabahya.jpg",
        location: "Uvira, DRC",
      },
      {
        name: "Mary Omega",
        role: "President, Kamser Seka Widows Self-Help Group. Hub Leader. Training: Education / Agro-ecology.",
        photo: "/images/people/team/mary-omega.jpg",
        location: "Kenya",
      },
    ],
  },
  {
    heading: "Program Leads",
    members: [
      {
        name: "Juliet Ngaji",
        role: "Program Lead, Kilimo Bunifu III (Thee Next Gen Awakening – Africa 4.0).",
        photo: "/images/people/team/juliet-ngaji.jpg",
        // TODO(founder/Juliet): two-line bio.
      },
    ],
  },
  {
    heading: "Staff",
    members: [
      {
        name: "Uche Obiefuna",
        role: "Web Developer, Passion of Hope International. Training: Agro-ecology.",
        photo: "/images/people/team/obiefuna-marcel-uchenna.jpg",
        location: "Nigeria",
      },
    ],
  },
  {
    heading: "Board of Directors",
    members: [
      {
        name: "Rebecca Carsky-Stephenson, Ph.D.",
        role: "Head Teacher, The English International School (Benin)",
        photo: "/images/people/team/rebecca-carsky-stephenson.jpg",
      },
      {
        name: "Olakunle Olaniyan, MD, MBA, FACP, FHFMA",
        role: "Medical Director at Anthem National Accounts (USA)",
        photo: "/images/people/team/olakunle-olaniyan.jpg",
      },
      {
        name: "Michael S Jackson, Esq.",
        role: "Chief Legal Officer, Strother Enterprises Inc. (USA)",
        photo: "/images/people/team/michael-jackson.jpg",
      },
      {
        name: "Simeon Ehui, Ph.D.",
        role: "Regional Director, Continental Africa, CGIAR; Director General, IITA (Nigeria)",
        photo: "/images/people/team/simeon-ehui.jpg",
      },
      {
        name: "Dr. Sarah Olembo",
        role: "Board Member. Horticulture Trade Specialist. Formerly, African Union Department of Rural Economy and Agriculture.",
        photo: "/images/people/team/sarah-olembo.jpg",
        location: "Kenya",
      },
      {
        name: "Sharon Waswa",
        role: "Board Chairperson, Passion of Hope Kenya. Learning & Development Specialist, AGCO.",
        photo: "/images/people/team/sharon-waswa.jpg",
      },
      {
        name: "Audrey Bracey Deegan",
        role: "Head of Business Development — Indian Ocean",
        photo: "/images/people/team/audrey-bracey-deegan.jpg",
      },
      {
        name: "Patricia Green",
        role: "Board Member",
        photo: "/images/people/team/patricia-green.jpg",
      },
    ],
  },
];
