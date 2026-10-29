// ---------------------------------------------------------------------------
// Site facts — the numbers and details that appear on several pages.
// Change a value here and every page that shows it updates.
//
// Rules (see docs/HOW-TO-UPDATE.md):
//   - Never type a guess. Unknown → null, and the site shows nothing.
//   - Every stat carries `source` (a URL or a document name) and `asOf`
//     (the date it was true). Stats with a URL source get a "Source" link.
//   - Open questions about these figures are in docs/content-audit-2026-10.md.
// ---------------------------------------------------------------------------

export interface Stat {
  value: string;
  label: string;
  /** Small line under the label. */
  sub?: string;
  /** URL (shown as a link) or document name (shown as text); null = unsourced. */
  source: string | null;
  /** YYYY-MM or YYYY-MM-DD the figure was true; null = unknown. */
  asOf: string | null;
}

export const siteFacts = {
  organisation: {
    name: "Passion of Hope International",
    /** Source: Candid (GuideStar) profile. */
    ein: "30-1116311",
    /** Shown on the contact page. TODO(founder): add the city (Candid lists Baltimore, MD)? */
    headquarters: "Maryland, USA",
  },

  contact: {
    emails: ["victor@passionofhope.org", "admin@passionofhope.org"],
    /** Used in form error messages ("…or email us at"). */
    primaryEmail: "admin@passionofhope.org",
    phone: "+1 443-708-1026",
    hours: "Mon – Fri, 9am – 5pm EST",
  },

  /**
   * Full profile URLs only. An icon appears in the footer only when its URL
   * is set. TODO(founder): supply the official profile URLs.
   */
  social: {
    linkedin: null as string | null,
    facebook: null as string | null,
    youtube: null as string | null,
    x: null as string | null,
    /** Used for X/Twitter link previews. TODO(founder): confirm the handle. */
    xHandle: "@PassionHopeIntl" as string | null,
  },

  stats: {
    jiimarisheIncome: {
      value: "5×",
      label: "Income increase",
      sub: "Jiimarishe apiculture pilot",
      source: null, // TODO(founder): source and location (Gilgil / Kendu Bay) — audit §1.4
      asOf: null,
    },
    activeHubs: {
      value: "4",
      label: "Active hubs",
      sub: "Across East & West Africa",
      source: null, // TODO(founder): /impact says 4, /strategic-goals says 3 — audit §1.3
      asOf: null,
    },
    knowledgeHubs: {
      value: "3",
      label: "Knowledge hubs",
      sub: "Across East & West Africa",
      source: null, // TODO(founder): see activeHubs
      asOf: null,
    },
    countries: {
      value: "3",
      label: "Countries",
      sub: "Kenya · Nigeria · DRC",
      source: "Hub pages",
      asOf: "2026-10",
    },
    communitiesReached: {
      value: "20+",
      label: "Communities reached",
      sub: "Direct programme beneficiaries",
      source: null, // TODO(founder)
      asOf: null,
    },
  } satisfies Record<string, Stat>,
};

export type StatKey = keyof typeof siteFacts.stats;

export function stat(key: StatKey): Stat {
  return siteFacts.stats[key];
}

/** Footer/structured-data social links that are actually set. */
export function socialProfiles(): { network: "linkedin" | "facebook" | "youtube" | "x"; url: string }[] {
  const { linkedin, facebook, youtube, x } = siteFacts.social;
  return (
    [
      ["linkedin", linkedin],
      ["facebook", facebook],
      ["youtube", youtube],
      ["x", x],
    ] as const
  )
    .filter((entry): entry is readonly ["linkedin" | "facebook" | "youtube" | "x", string] => Boolean(entry[1]))
    .map(([network, url]) => ({ network, url }));
}
