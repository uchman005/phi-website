# PHI website — content claims audit

**Prepared:** 29 October 2026 · **Scope:** every public page on passionofhope.org (43 routes) plus page titles, search descriptions, link-preview text and the structured data in `app/layout.tsx`.

**How to use this:** for each row, tick the recommendation or write the correct fact next to it. "Source found?" means a source exists in the repo or in the documents supplied for this review (Candid profile, Kilimo Bunifu documents, KB III concept and FGD report). It does not mean the claim is wrong. Most claims here are probably true; they just can't be checked from what the site has.

**Recommendations:**
- **keep:** fine as written, sourced or uncontroversial.
- **needs source:** probably fine, but someone should confirm it or send a source before it stays.
- **rewrite:** the wording overstates, conflicts with another page or reads wrong.
- **remove:** should come off unless someone can stand behind it.

---

## 1. Decide these first

These are the items a donor or partner would most likely notice.

1. **"100% of your gift reaches the mission" appears 7 times** (§3). The Donate FAQ already says something narrower and more defensible: programme gifts fund project costs, and overhead is covered by the board and Sustaining Supporters. PayPal fees also come out of every gift, and Sustaining Supporter gifts fund overhead by design. → Use the FAQ wording everywhere, or confirm the 100% claim against the accounts.
2. **One quote, two people.** "…It has restored *our* dignity and given *us* hope for the future" is attributed to **Grace Adede** on /impact. "It has restored *my* dignity and given *me* hope for the future" is attributed to **Syprina Auma** on /testimonials. → Check the original and attribute it once.
3. **How many hubs?** /impact says **4 active hubs**, /strategic-goals says **3 knowledge hubs**, and /programs/hubs lists **3**. → Pick one number.
4. **Jiimarishe "5×" (five-fold income)** is used 9 times with no source. Places conflict: **Gilgil** (homepage, About, Legacy, hero), **Kendu Bay** (Jiimarishe page, Donate) or **both** (Jiimarishe page). Legacy says "*up to* a five-fold increase… 20 farmers"; everywhere else says flat 5×. It is also reused as the metric for "Empowering Women" on /impact. → Confirm the location and figure, add a source, and stop reusing it for women's empowerment.
5. **Kilimo Bunifu is still described as farmer training** in three places, contradicting the new Kilimo Bunifu pages, which follow your documents: the homepage hero ("trains smallholder farmers as scientists"), /programs/think-global ("hands-on training events… for hub leaders and partners") and /impact's Agriculture card ("Farmer field schools train smallholders as scientists… Kilimo Bunifu model"). → Rewrite all three to match the series pages.
6. **Testimonials from team members presented as community voices.**
   - The homepage shows **Mariam Olorundare** (Nigeria Hub leader, MEF President) as "Women Empowerment Lead · Maripha" under "From the communities we serve".
   - /impact shows **Juliet Ngaji** as an Egerton student; she is now KB III Program Lead.
   - → Either label them as PHI team or partner voices, or replace them with community members.
7. **Aggrey Griffins has two different quotes.** On the homepage he says "PHI doesn't come to us with ready-made solutions…". On /testimonials he says "When PHI gave us the opportunity to attend the World Food Day event…". → Confirm which he said. The homepage one has no source.
8. **Ndhiwa health-day post** is dated **14 August 2024** but describes the **23–24 August 2024** event in the past tense ("hosted", "providing… to over 4,000 residents"). → Fix the date or the tense, and source the 4,000 figure.
9. **Impact headline stats have no sources:** 20+ communities, 20+ schools, 3 water projects, 4 health outreaches, 4 hubs and 5×. Phase 4 adds one file (`lib/site-facts.ts`) where each stat gets a value, source and as-of date, and any stat with a source shows a footnote.
10. **Meta keywords** are a list of 12 donor-search phrases (e.g. "best African charities to donate to"). Search engines ignore them and they read as keyword stuffing. → **Remove.**

---

## 2. Already fixed in this round (for the record)

| Where | What changed | Why |
|---|---|---|
| Footer | EIN now **30-1116311** | Matches your Candid profile |
| Footer | Placeholder "EIN: 88-XXXXXXX" removed | Placeholder |
| Footer | Social icons hidden | They linked to platform homepages, not PHI profiles |
| /programs/kilimo-bunifu | "$50 puts one farmer through a Kilimo Bunifu workshop" removed | No source; conflicted with the $100 donation minimum |
| /impact | Syprina Auma beekeeping story and quote removed | Conflicted with the dated blog post (storm, rebuilt home) |
| /programs/jiimarishe | "participants like Syprina Auma… a dozen hives" removed | Same conflict |
| Homepage | "Farmer Education" card retitled **Adopt-a-School** | The copy describes schools for children. **Confirm the programme name.** |
| /programs/kilimo-bunifu | "Farmer as scientist / field workshop" content removed | None of the Kilimo Bunifu sources describe it |
| Everywhere | "Juliet Wanjiru Njagi" → **Juliet Ngaji** | Your decision |
| Nav | "Think Global" and "Our Hubs" moved into the Programs menu | Their breadcrumbs and the footer already treat them as programs (see §4 Think Global) |

---

## 3. Page-by-page

### Site-wide (layout, footer, structured data)

| Page | Exact text | Type | Source found? | Conflicts with | Recommendation |
|---|---|---|---|---|---|
| All (default description) | "…100% of your gift reaches the mission." | % claim | No | Donate FAQ wording | rewrite (see §1.1) |
| All (keywords) | "donate to Africa charity", "best African charities to donate to", +10 more | Metadata | — | — | **remove** |
| All (twitter:site, JSON-LD sameAs) | "@PassionHopeIntl" / twitter.com/PassionHopeIntl | Social handle | No | Footer has no X link | needs source: confirm handle or remove |
| JSON-LD | taxID "30-1116311" | Registration | **Yes** (Candid) | — | keep |
| JSON-LD | areaServed: Kenya, Nigeria, DRC | Places | Partly (hub pages) | KB events in Zimbabwe; team in Benin | keep |
| JSON-LD / Contact | Address: country US only; Contact says "Maryland, USA" | Place | Candid: **Baltimore, MD**; KB III letterhead: **30 W. 25th Street, Baltimore, MD 21218** | — | rewrite: add the city (and street if you want it public) |
| Legal name | "Passion of Hope International" | Name | Candid lists **"Passion of Hope International USA"** | — | needs source: confirm the public name |
| Footer | "Registered 501(c)(3) non-profit · EIN: 30-1116311" | Registration | **Yes** (Candid) | — | keep |

### Homepage `/`

| Page | Exact text | Type | Source found? | Conflicts with | Recommendation |
|---|---|---|---|---|---|
| / (title) | "Donate to a 501(c)(3) Charity for Rural Africa" | Registration | Yes (Candid) | — | keep |
| / (description + preview) | "food security, clean energy, and women's economic empowerment in Kenya, Nigeria, and the DRC… 100% of your gift reaches the mission" | Programmes, % claim | Programmes: partly (hub pages) | §1.1 | rewrite the 100% part |
| / hero slide 2 | "Systems Integrator making local partners effective" | Positioning | — | — | keep (fix the missing full stop in its description) |
| / hero slide 5 | "Kilimo Bunifu — innovative farming — trains smallholder farmers as scientists, applying agro-ecological principles to increase yields, restore soil…" | Programme description | **No**; KB sources say otherwise | /programs/kilimo-bunifu | **rewrite** |
| / hero slide 7 | "From the Jiimarishe honey enterprise in Gilgil to our school adoption programme…" | Place | No | Jiimarishe page says Kendu Bay | needs source (§1.4) |
| / Our Work | "Adopt-a-School — Partnering with rural schools to improve infrastructure, provide learning materials, and train teachers" | Programme | No | Impact "20+ schools supported" | needs source: confirm the programme and its scale |
| / Our Work | "Jiimarishe — A pilot apiculture enterprise in Gilgil, Kenya, that increased household income by 5× — now scaling across East Africa" | Number, place | No | Kendu Bay (Jiimarishe page); "scaling into DRC" (Donate); "East and West Africa" (Jiimarishe page) | rewrite (§1.4; pick one scaling claim) |
| / Our Work | "Chakula Bora — Holistic community interventions — clean water, health outreach, women's empowerment, and housing" | Programme description | No | /programs/chakula-bora calls Chakula Bora a knowledge network; KB I sources call it a food brand | **rewrite**: this card describes the Impact areas, not Chakula Bora |
| / Financial quote | "100% of gifts reach the mission… Every dollar you give goes directly to community programmes" | % claim | No | Donate FAQ | rewrite (§1.1) |
| / Financial quote | "The poor themselves can create a poverty-free world — all we have to do is free them from the chains that we have put on them." — Muhammad Yunus | Quote | No | Variants of this quote circulate | needs source: check the wording against the original |
| / Testimonials | Aggrey Griffins: "PHI doesn't come to us with ready-made solutions…" · "Community Farmer · Kendu Bay" | Testimonial | No | /testimonials gives him a different quote, location "Kamser Seka" | needs source (§1.7) |
| / Testimonials | Mariam Olorundare: "The training programmes changed how I see myself…" · "Women Empowerment Lead · Maripha" | Testimonial | No | She is a PHI hub leader (§1.6); her title differs on every page (see Team) | rewrite: label as a team voice or replace |
| / Banner | "Kilimo Bunifu III · 24 Nov · Bulawayo + online" | Date, place | **Yes** (KB III concept, flyer) | — | keep |

### Donate `/donate`

| Page | Exact text | Type | Source found? | Conflicts with | Recommendation |
|---|---|---|---|---|---|
| /donate (description) | "Fund food security, **clean cookstoves**, school gardens, and women's enterprise… — 100% of your gift reaches the mission" | Programmes, % claim | No | No cookstove project can be chosen on the form (cookstoves are a Kenya-hub project) | **rewrite**: name only the projects on the form; drop 100% |
| /donate (preview) | "100% of your donation reaches communities in rural Africa." | % claim | No | §1.1 | rewrite |
| /donate hero | "Every gift goes directly to communities in need" | Claim | No | Sustaining Supporter funds overhead | rewrite |
| /donate summary box | "100% of your gift reaches the mission. All administrative costs are covered by our board and operational supporters." | % claim | No | §1.1 | rewrite |
| /donate FAQ | "Every gift to a programme or the General Fund goes straight to project costs… Day-to-day administrative expenses are covered separately by our board and by Sustaining Supporters" | Finance | No | — | **keep as the model wording**, if accurate |
| /donate FAQ | "You will receive a receipt for your records." | Process | PayPal sends a payment receipt | Is a tax receipt sent? | needs source: confirm the receipting process |
| /donate FAQ | "the minimum gift is $100" | Money | Yes (code: `MIN_DONATION_AMOUNT`) | — | keep |
| /donate projects | FEED Africa: "from the Ndhiwa Mother Farm in Kenya to the **Maripha Institute** in Nigeria" | Names, places | Partly | FEED page says "Farmer Entrepreneur Institute at Maripha Farms"; press release says "Research and Incubator Center" | rewrite: one name |
| /donate projects | Jiimarishe: "Apiculture enterprise raising incomes in Kendu Bay, Kenya — now scaling into DRC communities" | Place, claim | No | Gilgil (homepage); "East Africa" / "East and West Africa" | rewrite (§1.4) |
| /donate | "Donors in East Africa can also give by mobile money via M-Changa" | Payment method | No | — | needs source: confirm the M-Changa page is live |

### About `/about`

| Page | Exact text | Type | Source found? | Conflicts with | Recommendation |
|---|---|---|---|---|---|
| /about timeline | "Founded · Maryland, USA · PHI incorporated as a US 501(c)(3)" | Date, registration | 501(c)(3): yes (Candid). **No founding year shown.** | Legacy: "a decade of proof" | needs source: add the founding year |
| /about timeline | "First Hubs · Kenya · Nigeria · DRC" | Places | Hubs exist (hub pages) | No date | needs source: add a year |
| /about timeline | "2021 · Gilgil, Kenya · The Jiimarishe honey pilot launched — increasing household income by 5×" | Date, number | No | §1.4 | needs source |
| /about timeline | "Today · Continent-wide · A growing movement… a continent-wide knowledge network" | Claim | No | 3 countries | rewrite: "continent-wide" overstates |
| /about team | Mariam Olorundare: "**Nigeria Hub Director**" | Title | No | Team: "President, MEF. Hub Leader"; hubs: "**CEO**, MEF" | rewrite: one title |
| /about team | Guillain Nabahya: "**DRC Hub Director**… in **Uviria** and **Lubumbashi**" | Title, places | No | Team: "Board Chair and Director, NFI"; "Uviria" is a typo for Uvira; Lubumbashi isn't mentioned anywhere else | rewrite |
| /about team | Mary Omega: "**Kenya Hub Director**… chama groups… into **corporative** enterprises" | Title, typo | No | Team: "President, Kamser Seka Widows **Self-Help Group**"; hubs: "Founder & Director, **KSWCSI**" | rewrite: one title, and "cooperative" |
| /about team | Victor Ibeto: "**US Management COO**" | Title | No | Team: "Chief Operating Officer… Attorney", location **Benin** | rewrite |

### Impact `/impact`

| Page | Exact text | Type | Source found? | Conflicts with | Recommendation |
|---|---|---|---|---|---|
| /impact stat | "5× · Income increase · Jiimarishe apiculture pilot" | Number | No | §1.4 | needs source |
| /impact stat | "**4** · Active hubs · Across East & West Africa" | Number | No | /strategic-goals "**3**", hubs page lists **3** | **rewrite** (§1.3) |
| /impact stat | "3 · Countries · Kenya · Nigeria · DRC" | Number | Yes (hub pages) | — | keep |
| /impact stat | "20+ · Communities reached · Direct programme beneficiaries" | Number | No | Also on /strategic-goals | needs source |
| /impact area | Clean Water: "PHI installs **bore-holes**, rainwater harvesting systems, and trains community water committees" · "**3 water projects**" | Programme, number | Rainwater: partly (Legacy, Syprina post). Bore-holes: **no** | Legacy: "90 schools" water project | needs source: "3" vs 90 schools; drop bore-holes unless true |
| /impact area | Health: "Mobile health clinics, community health worker training, and partnerships with local medical facilities" · "**4 health outreaches**" | Programme, number | One event documented (Ndhiwa, 2024 post) | — | needs source |
| /impact area | Education: "Adopt-a-School builds and equips rural classrooms, trains teachers…" · "**20+ schools supported**" | Programme, number | No | Legacy "90 schools" (water) | needs source |
| /impact area | Empowering Women: "…legal literacy, and leadership programmes…" · "**5× income increase**" | Programme, number | No | 5× is the Jiimarishe figure | **rewrite**: use a women's-empowerment figure or none |
| /impact area | Housing: "Dignified, climate-resilient housing… PHI integrates **solar energy**, rainwater collection, and ventilation into affordable community housing" · "Community-built" | Programme | Partly: the Syprina post documents 2 homes with rainwater tanks | No solar source | rewrite to match what was built |
| /impact area | Agriculture: "Farmer field schools train smallholders as scientists… · **Kilimo Bunifu model**" | Programme | Field schools: yes (DRC hub). KB link: **no** | KB pages | **rewrite** (§1.5) |
| /impact story | Grace Adede: "Since Passion of Hope International came on board, our lives have greatly changed. It has restored our dignity and given us hope for the future." | Testimonial | No | Syprina's quote on /testimonials (§1.2); /testimonials gives Grace only the first sentence | needs source |
| /impact story | Juliet Ngaji: "It was one of the most meaningful and eye-opening experiences of my life. I plan to carry these ideas forward in my own work." · "Communications & Media Student, Egerton University" | Testimonial, title | No | /testimonials has only the first sentence; she is now KB III Program Lead | rewrite (§1.6) |

### Programs

| Page | Exact text | Type | Source found? | Conflicts with | Recommendation |
|---|---|---|---|---|---|
| /programs/hubs | Hub leader titles: "Mariam Olorundare — **CEO**, MEF", "Mary Omega — **Founder & Director**, KSWCSI", "Guillain Nabahya — Board Chair & Director, NFI" | Titles | No | Team and About pages (see above) | rewrite: one title per person, everywhere |
| /programs/hubs/nigeria | "A **15-acre** demonstration farm" | Number | No | — | needs source |
| /programs/hubs/nigeria/value-addition | "branded, **100% organic** products" | % claim | No | — | needs source: certified? If not, say "organically grown" |
| /programs/hubs/drc | "NFI is a grant award winner of the Water and Energy for Food Grand Challenge (WE4F)… supported by Germany's BMZ, the European Union, the Netherlands, Norad, Sida, and USAID" | Award, organisations | No link | — | needs source: link the award |
| /programs/hubs/drc (+ briquettes) | "saves each farming family about **$27 per month**" | Money | No | — | needs source |
| /programs/hubs/drc/bio-fertilizer | "crop yields increase by about **150% (p ≤ 0.05)** compared to local practice on soil without biochar (**60.4%**)" | Number | No | The sentence doesn't make sense as written | **rewrite** with the study it comes from, or remove |
| /build-capacity | "In Uvira, Guillain runs **ten** farmer field schools" | Number | No | DRC hub page gives no count | needs source |
| /programs/hubs/kenya | "'Every widow, young mother, and vulnerable family deserves a second chance…' — Mary Omega, Founder & Director" | Quote, title | No | Title conflicts (above) | needs source |
| Kenya org name | "Kamser Seka Widows **Community Support Initiative (KSWCSI)**" / "**Self-Help Group**" (team) / "Widows **CBO**" (Syprina post) / "**Blessed** Widows Group" (Grace Adede) | Organisation names | No | Each other | rewrite: confirm whether these are one organisation or several |
| /programs/feed-africa | "Launched in **2025**… Farmer Entrepreneur Institute at Maripha Farms… Research and Incubator Center" | Date, names | **Yes** (press release: MoU 18 Jul 2025, activation 5 Nov 2025) | Donate: "Maripha Institute" | keep; align the name |
| /programs/feed-africa | "the 'Mother Farm'… the cornerstone of the **Odinga Campus at Tom Mboya University**… a consortium of partners in the **Ndhiwa Municipality**" | Organisations, places | No | — | needs source: confirm with Tom Mboya University |
| /programs/feed-africa | "Chakula Bora Schools Program… students in **Grades 4 to 8**" | Programme | No | — | needs source |
| /programs/feed-africa | "contributing directly to the African Union's Agenda 2063" | Claim | No | — | rewrite: "aligned with" is safer than "contributing directly" |
| /programs/jiimarishe (description) | "lifts household income **fivefold**" | Number | No | §1.4 | needs source |
| /programs/jiimarishe | "began as an apiculture pilot in **Gilgil and Kendu Bay**" · "5× household income… pilot in **Kendu Bay**" · "now scaling across **East and West Africa**" | Places, claim | No | Homepage/About/Legacy: Gilgil only; Donate: "scaling into DRC" | rewrite (§1.4) |
| /programs/chakula-bora | "ChakulaBora — Swahili for 'good food' and 'good things'" · "Expore the network" | Definition, typo | KB I documents: "Chakula Bora means 'good food'" | Spelled "ChakulaBora" and "Chakula Bora" on different pages | keep; fix the typo "Expore"; pick one spelling |
| /programs/chakula-bora | "so a breakthrough in one community reaches every other in real time" | Claim | No | — | rewrite: describe what the platform does today |
| /programs/think-global | Whole page | Duplicate | — | Largely repeats /programs/chakula-bora (same intro line and definition) | **rewrite or remove**: decide whether "Think Global" is its own programme |
| /programs/think-global | "Kilimo Bunifu Workshop — Hands-on training events — in-person and online — covering agro-ecology, enterprise development, data collection, and community governance for hub leaders and partners" | Programme description | **No** | KB pages | **rewrite** (§1.5) |
| /programs/kilimo-bunifu/* | KB I, II and III facts | Dates, people, places | **Yes**: overview, ICAT 9 poster, KB I collage, KB II agenda and concept, KB III concept, flyer, FGD 1 report | KB I: overview says "six keynote speakers", poster lists **nine** panelists (the page lists nine and omits the count) | keep; open items in §5 |
| /programs/kilimo-bunifu/2026 | "~72M… NEET, two-thirds young women" · "55%… surveyed in 2025" · "~42% of the world's youth by 2030" | Statistics | In the KB III concept, **no external source** | — | needs source: send the reports these come from (source links appear automatically once added) |

### Other pages

| Page | Exact text | Type | Source found? | Conflicts with | Recommendation |
|---|---|---|---|---|---|
| /legacy | "A 2021 pilot with **20 farmers** in Gilgil… producing **up to** a five-fold increase" | Number, date | No | Elsewhere: flat "5×" | needs source (§1.4) |
| /legacy | "With Running Water International, rainwater harvesting systems brought clean, safe water to **90 schools** and more than **36,000 students** across the Meru and Nakuru regions" | Numbers | No | Impact "3 water projects" | needs source |
| /legacy | "Every gift builds on **a decade of proof**" | Date | No founding year anywhere | /about | needs source |
| /legacy | "a growing movement… connected under the FEED Africa initiative" · "continent-wide movement" (description) | Claim | No | 3 countries | rewrite |
| /strategic-goals | "**3** · Knowledge hubs" · "20+ communities" · "5×" | Numbers | No | /impact "4 active hubs" | rewrite (§1.3) |
| /strategic-goals | Drip irrigation, solar, mobile health kits, grain stores | Goals | Stated as goals | — | keep (they're goals, not results), or mark which exist today |
| /testimonials (description) | "formal endorsements from partner organization**s**" | Claim | One endorsement shown | — | rewrite: singular, or add the others |
| /testimonials | "Homabay County Peace Network formally recognizes PHI's partnership and impact in food security and education across the region." | Endorsement | No letter in repo | — | needs source: link or keep the letter on file |
| /testimonials | Syprina Auma: "It has restored my dignity and given me hope for the future." · "Widow · Wang' Chieng Ward, Homa Bay County" | Testimonial | No | Grace Adede's quote (§1.2) | needs source |
| /team | Simeon Ehui, Ph.D.: "Regional Director, Continental Africa, CGIAR; Director General, IITA (Nigeria)" | Title | No | — | needs source: possibly outdated |
| /team | Olakunle Olaniyan: "Medical Director at Anthem National Accounts (USA)" | Title | No | — | needs source: confirm current |
| /team | Audrey Bracey Deegan: "Head of Business Development — Indian Ocean" | Title | No | **Organisation missing** | rewrite: add organisation |
| /team | Patricia Green: "Board Member" | Title | No | **No role or organisation** | rewrite: add title |
| /team | Sharon Waswa: "Board Chairperson, **Passion of Hope Kenya**…" | Organisation | No | A separate Kenyan entity isn't mentioned elsewhere | needs source: confirm and say so on /about if true |
| /team | Brian Stephenson: "CEO, DHA East Africa, Ltd." | Title | No | DHA East Africa is also listed as a partner | keep; consider disclosing the link on /partners |
| /team | Juliet Ngaji: "Program Lead, Kilimo Bunifu III" | Title | **Yes** (KB III concept) | — | keep; bio pending |
| /partners | All 12 partner names | Organisations | Ilorin: yes (press release). Tom Mboya and Egerton: yes (KB III concept + your confirmation). Others: no | Green Belt Movement is commented out | needs source: confirm each is a current partner |
| /partners | "Programme grants — From **$10,000**" · "Major gifts — From **$50,000**" | Money | No | — | needs source: confirm the tiers are current policy |
| /contact | "victor@passionofhope.org, admin@passionofhope.org" · "+1 443-708-1026" · "Mon – Fri, 9am – 5pm EST" | Contact | No | — | needs source: confirm the phone line and hours are staffed |
| /blog/medical-care-ndhiwa | Dated "August 14, 2024"; "On August 23–24, 2024, PHI **hosted**… to **over 4,000** residents"; "For the past three years" | Date, number | No | Date vs tense (§1.8) | **rewrite** |
| /blog/press-release | "Prof. Ogunlade **Isreal**" | Name | No | Likely "Israel" | needs source: check spelling |
| /blog/syprina-aumas-journey | "75-year-old… storm in March 2024… Susan Atieno" | People, date | It is the source | — | keep |
| /gallery | Photo captions | — | — | — | keep |

---

## 4. Structure (no fact to check)

- **Think Global vs ChakulaBora:** two pages describe the same Chakula Bora network. I moved both "Think Global" and "Our Hubs" into the Programs menu, where their breadcrumbs and the footer already put them. **Your decision:** keep "Think Global" as its own programme with distinct content, or merge it into ChakulaBora and redirect.
- **Spelling:** "ChakulaBora" and "Chakula Bora" are both used. Pick one.
- **Long search descriptions:** the homepage (198 characters), Donate (250) and a few programme pages exceed ~160 characters and get cut off in Google. I'll shorten them once §1.1 is decided, because most of the extra length is the 100% claim.

## 5. Still waiting on information (shown as "nothing" on the site until supplied)

- Social profile URLs (LinkedIn, Facebook, YouTube, X) and the X handle
- Jiimarishe location: Gilgil, Kendu Bay or both
- KB III: ICAT confirmation of 24 Nov; livestream platform; FGD 2 and FGD 3 dates and places; sources for the three stat cards
- Juliet Ngaji's two-line bio; photos and roles for Asli Nur, Angel Kabelo and Dr. Gabriel Opolot
- Logos for the University of Ilorin, Tom Mboya University and Egerton University
- KB II speaker spelling "Akinyaode" (as printed on the agenda)
- September news items and any further new partners
