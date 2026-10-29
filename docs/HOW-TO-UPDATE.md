# How to update the PHI website

Each task below is one edit to one file, plus a photo if needed. None of them involve touching page layouts.

**The one rule:** never type a guess. If you don't know a value, leave it out or set it to `null`. The site hides anything that's missing instead of showing a placeholder.

## Before you start (once)

```bash
bun install
bun run dev        # preview at http://localhost:3000
```

## After every change

1. Check the page in your browser at http://localhost:3000.
2. Run `bun run lint` and `bun run build`. Both must finish without errors.
3. Commit, then push to `master`. **Pushing to `master` publishes the site automatically.** If the build fails on the server, the site stays on the previous version.

**Images:** put them in `public/images/…`, using lowercase names with hyphens (`juliet-ngaji.jpg`). Keep each one under about 500 KB; a phone photo resized to 1600px wide is plenty. In the code, refer to them without `public`, e.g. `/images/people/team/juliet-ngaji.jpg`.

---

## 1. Add a news post (≈ 5 min)

**File:** `lib/blog-posts.ts`. Add the new post **at the top** of the `blogPosts` list.

The homepage and Impact page show the 3 newest posts automatically, sorted by `isoDate`. The blog index, the post's own page and the sitemap update by themselves.

```ts
  {
    slug: "short-url-name",                 // becomes /blog/short-url-name; lowercase, hyphens
    title: "Headline as it should appear",
    excerpt: "One or two sentences shown on the cards and in search results.",
    date: "September 18, 2026",             // as displayed
    isoDate: "2026-09-18",                  // same date, YYYY-MM-DD — controls the order
    author: "Passion of Hope International",
    tag: "Partnerships",                    // e.g. Partnerships, Impact Story, Health, Kilimo Bunifu
    thumbnail: "/images/blog/short-url-name-thumb.jpg",
    body: [
      { type: "p", text: "First paragraph." },
      { type: "image", src: "/images/blog/short-url-name-1.jpg", alt: "What the photo shows" },
      { type: "p", text: "Next paragraph." },
      // Optional button at the end:
      { type: "link", href: "/programs/kilimo-bunifu/2026", label: "Join the workshop" },
    ],
  },
```

**Photos:** `public/images/blog/`. Thumbnails work best in landscape.

---

## 2. Add a partner (≈ 3 min)

**File:** `lib/partners.ts`. Add an entry to the `partners` list.

A partner shows a **"New"** badge for 90 days after `addedOn`. Without a logo, the name is shown on its own, which is fine until a logo arrives.

```ts
  {
    name: "Organisation Name, Country",
    logo: "/images/logos/partners/organisation-name.png",   // optional
    blurb: "One line on the relationship.",                  // optional
    addedOn: "2026-10-29",                                   // today's date
  },
```

**Logos:** `public/images/logos/partners/`. A PNG on a white or transparent background, about 600px wide.

Only list organisations that have agreed to be named publicly.

---

## 3. Add or change a team member (≈ 3 min)

**File:** `lib/team.ts`. Find the right section ("Leadership", "Hub Leaders", "Program Leads", "Staff" or "Board of Directors") and add an entry.

```ts
      {
        name: "Full Name",
        role: "Title, Organisation.",
        photo: "/images/people/team/full-name.jpg",   // square photo, at least 400×400
        location: "Kenya",                             // optional
        bio: "Two short lines about them.",            // optional
      },
```

**Photos:** `public/images/people/team/`.

If the person also appears elsewhere (About page, hub pages, a testimonial), use the **same spelling and title** there too. Search the project for their name.

---

## 4. Update Kilimo Bunifu III (≈ 2 min each)

**File:** `lib/kilimo-bunifu.ts`. Find the entry with `slug: "2026"`.

| To… | Change |
|---|---|
| Show that ICAT confirmed the date | `dateConfirmed: null` → `dateConfirmed: true`. The "Date subject to ICAT confirmation" note disappears. |
| Name the livestream platform | `livestream: null` → `livestream: "LinkedIn Live"` |
| Add an FGD's date and place | In `fgds`, set `date: "2026-09-05"` and `place: "Kisumu, Kenya"` on FGD 2 or FGD 3 |
| Change an FGD's status | `status: "completed"`, `"upcoming"` or `"tbc"` |
| Add a summary to an FGD card | Add `summary: "Two sentences on what was said."` to that FGD |
| Cite a statistic | In `stats`, change `source: null` to the report's URL. A "Source" link appears on the card. |
| Add a team member's photo or role | In `team`, add `photo: "/images/people/team/name.jpg"` and/or `affiliation: "Role"` to their entry |
| Add a participating university | Add `{ name: "University Name", place: "City, Country" }` to `universities` |

**Countdown and dates:** these run themselves.
- The homepage banner and countdown switch to "outcomes" after 24 November and disappear 60 days later.
- The join form switches to "Join the December study groups".

None of this needs a redeploy; pages refresh every hour.

**Sign-ups** from the Kilimo Bunifu III form are saved on the server. See §7.

---

## 5. Add a new Kilimo Bunifu edition (≈ 15 min)

1. Make a folder `public/images/kilimo-bunifu/<year>/` and put the edition's images in it. You need at least one landscape image for the card and link preview.
2. In `lib/kilimo-bunifu.ts`, copy an existing edition entry, paste it into `kilimoBunifuEditions`, and change every field. Delete any optional section you have no content for (`people`, `agenda`, `breakouts`, `gallery`, `fgds`…); the page leaves it out.
3. For the upcoming edition, set `registration: true` to show the join form. Remove it from the previous edition.

The new page appears at `/programs/kilimo-bunifu/<year>`. The series page, edition cards, countdown, previous/next links, sitemap and calendar file all update by themselves. The newest edition becomes the featured one and the subject of the homepage banner.

Keep the minimum fields:

```ts
  {
    slug: "2028",
    numeral: "IV",
    title: "Edition name",
    theme: "What this edition is about",
    dates: { startDate: "2028-11-20", endDate: "2028-11-20", timeZone: "Africa/Nairobi" },
    format: "Hybrid · City, Country + online",
    icat: { edition: "13th ICAT", place: "City, Country" },
    image: { src: "/images/kilimo-bunifu/2028/share.jpg", alt: "Describe the image", width: 1200, height: 630 },
    summary: ["One or two paragraphs about the edition."],
    dateConfirmed: null,
    livestream: null,
  },
```

`numeral` accepts "I", "II" or "III" today. For edition IV and beyond, add the new numeral to the `numeral` type at the top of the file.

---

## 6. Organisation details and headline numbers (≈ 2 min)

**File:** `lib/site-facts.ts`

| To… | Change |
|---|---|
| Add a social media icon to the footer | Set e.g. `linkedin: "https://www.linkedin.com/company/…"` (the full profile URL) |
| Change the X/Twitter handle used in link previews | `xHandle: "@Handle"` |
| Change contact emails, phone or hours | `contact` |
| Update a headline number (Impact, Strategic Goals) | Change its `value`, and set `source` (a URL, or a document name like "2026 annual report") and `asOf` (`"2026-12"`). A sourced stat shows a "Source" footnote. |

Change the number **here**, not in the page files. That keeps every page showing the same figure.

Open questions about the current figures are listed in `docs/content-audit-2026-10.md`.

---

## 7. Read contact messages and sign-ups

Both forms save each submission as one line in a file on the server:

| Form | File on the server |
|---|---|
| Contact page | `data/submissions/contact.jsonl` |
| Kilimo Bunifu III join form | `data/submissions/kilimo-bunifu-2026.jsonl` |

Log in to the server, go to the app folder and run:

```bash
tail -n 20 data/submissions/contact.jsonl              # latest 20 messages
wc -l data/submissions/kilimo-bunifu-2026.jsonl        # how many sign-ups
```

The files survive deploys. Copy them off the server regularly.

**Email:** each Kilimo Bunifu III sign-up is also emailed to the addresses in `lib/site-facts.ts` → `notify.kilimoBunifu2026` (currently Juliet, Victor and Uchenna). Replying to that email goes straight to the person who signed up.
- To change who receives them, edit that list.
- Sending needs `ZEPTOMAIL_API_KEY` and `ZEPTOMAIL_FROM_ADDRESS` set on the server (see `.env.local.example`).
- If an email ever fails, the sign-up is still in the file above, and the server log notes the failure.

Contact-page messages are not emailed yet; they are only saved to the file.
