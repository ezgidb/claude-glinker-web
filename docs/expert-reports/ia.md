# Glinker Group website: information architecture v3

Scope: structure only (no copy). Sources: brief, owner checklist (notes and section 11 override the proposal column), prototype v2. Where two owner statements conflict, the later or more specific one wins, and the conflict is named.

## 0. Rulings on the open conflicts

### 0.1 Sector view: tabs inside the hub vs separate thin URLs

**Ruling: separate thin URLs, confirmed, with three amendments to the proposed form.**

Why separate URLs win:

- The owner already approved it three times: 3.3 (separate-URL static page, no pop-up), 4.2 (every step has its own URL), 10.12 (static page per sector). Tabs contradict approved decisions, they do not merely differ from an expert opinion.
- A tab state cannot be linked. The three priority sectors are exactly where outbound work happens (LinkedIn plan, e-mail to a data center or airport contact); each needs a URL that can be sent.
- Elementor tabs keep hidden content in one page: one title, one meta description, one hreflang pair for three audiences. A sector query ("airport transformer monitoring") has nothing to land on.
- Cost is low: one template, three pages, about 300 words each.

Honest counter-arguments, and how they are handled:

| Risk | Handling |
|---|---|
| A table-only page is thin and near-duplicate of the hub table | The hub table is by **asset class** (sector-neutral, explains what differs between assets). The sector table is by **where the asset sits in that sector's power chain and what an outage means there**. Different rows, different columns. No method explanation and no specs on sector pages. |
| Three more pages to maintain in two languages | Template is fixed, content is a table plus one paragraph; related notes are pulled by tag, not hand-written. |
| Sector pages start to repeat product information | Hard rule: product facts live only in technology pages. Sector pages carry the product **name as a link label only**. |

Amendments to the proposed form:

1. **Show product names in the sector table (name only, linked to the product anchor on the technology page).** The owner's stated goal in 2.4 is that a sector visitor sees "which service focus and which products" at a glance; a table that ends at a technology name falls short of that. Names are not specs, so the one-place rule holds.
2. **Add one sourced context paragraph per sector** (distribution: EPDK service-quality regulation; airports: the public March 2025 Heathrow substation fire, approved in 4.4; data centers: capacity growth). This is what makes each page unique; a bare table is not enough.
3. **`/sectors/` must exist as a WordPress parent page** for the hierarchy to work. It is not a content page: 301 it to the hub's `#sectors` anchor and exclude it from the XML sitemap. It becomes a real index only if sector pages exceed five.

Other sectors (generation, transmission, transport and rail, defense industry facilities, other critical infrastructure): one short block on the hub, no pages, no "coming soon". **Promotion rule:** a sector gets its own URL only when it has a table that differs from the existing three and at least one note tagged to it.

### 0.2 Sector entry on the home page

The owner's note on 3.2 says a visitor should see and pick a sector on arrival; her later feedback says the sector view belongs only to Online Monitoring. Both hold if the three sector links sit **inside the Online Monitoring card** on the home page, not as a site-wide selector. No sector selector above the two lines, no sector step before supply.

### 0.3 About: keep or drop (10.2, 11.6)

**Ruling: keep, as a short page in the menu.** Not as a "who we are" team page, but because three things have no other home:

- the Trade Facilitator explanation with both sides (buyer and manufacturer);
- the Megger relationship statement in one authoritative place;
- company facts a foreign buyer or public procurement officer checks before first contact (legal name, base, years, working method).

Dropping it would push that content onto the home page and break its job as a router. Conditions: maximum four sections, nothing repeated from the home page beyond one sentence, no team, no values wall. If after writing it holds fewer than about 250 words of non-repeated content, merge it into the home page and reduce the menu to four; decide that at copy stage, not now.

### 0.4 Where Trade Facilitator content lives

| Content | Lives in | Elsewhere |
|---|---|---|
| Label "Trade Facilitator" + one-line explanation | Home hero eyebrow | nowhere |
| Offer to international buyers (single access to Turkish manufacturers, alternatives in quality and lead time) | Supply page, opening section | About links to it, does not restate it |
| Two-sided explanation, slogan "Bridging Cultures, Building Trust" | About | nowhere |
| Turkish manufacturer block | About only | no home link, no form option (3.7 note, 11.11) |

### 0.5 Smaller conflicts settled here

| Conflict | Ruling |
|---|---|
| A. Eberle / Synaptec: 5.6 note "names stay" vs 11.2 "under Megger" | Products sit under the Megger-partnership umbrella; the maker's name stays as product attribution on the technology page. No separate brand section. |
| Supply groups: checklist 6.3 lists seven, brief lists six | Six groups. Weak current and building systems is covered by the single "contact us" sentence (6.4, 11.10). |
| CTA label: prototype "Plan a technical meeting" vs approved 2.7 / 3.1 | One label site-wide: "Request a technical meeting". Supply is the only page with a different primary CTA. |
| Counter: 9.8 "no animated counter" vs 10.1 "keep the motion" | Structure: numbers are static text in the HTML. Whether they animate is a phase-2 design decision. |
| Contact form on the home page (3.9) vs one-thing-one-place | Form exists only on Contact. Every other page ends in a CTA band that links there with the topic preselected. |
| Menu depth | Online Monitoring gets a simple dropdown (five technologies, three sectors). Other items stay flat. Reason: technology pages are the main search landing pages and must be one click from anywhere. |

## 1. Audit of prototype v2

Contradictions with decisions:

- "Authorized distributor" appears twice (home trust strip, About intro); the word is banned, wording is "strategic partner".
- Footer repeats the full menu; 2.8 approved a footer without menu repetition.
- Sector view is a JavaScript tab state with no URL; 3.3, 4.2 and 10.12 approved separate static URLs.
- No technology pages exist; products appear only as names in one table cell.
- No datasheet values and no "per manufacturer data" label anywhere (5.5).
- Two overlapping tables (three sector tables plus the master table) repeat the same asset, risk and method; the decision is one master table with no repetition.
- Master table has no "what differs" column, which was the point of 5.2 (transformer lead time, continuous PD on rotating machines, cables use a different method).
- Master table merges transformer and generator into one row and omits GIS and rotating machines (5.1, 5.2).
- "Other Megger solutions and field test instruments" is a full heading plus CTA band; decision is one non-specific sentence with no authorisation implied (2.6, 5.9).
- Hub headline is an outcome promise ("before they fail"); 5.1 approved a literal label and scope sentence.
- Hub tells the visitor to "choose your sector" first; the approved grouping is by technology, with sector as a second path.
- Türkiye rationale paragraph (5.7) is missing.
- Maker names (A. Eberle, Synaptec) are missing; the owner wants them kept (5.6).
- Home hero shows "Trade Facilitator" without the one-line explanation (1.3).
- Home card says "seen by sector: data centers, airports, distribution" but offers no sector link.
- About does not carry the slogan or the Megger relationship block (8.7, 10.2).
- About has a prominent "Contact us as a manufacturer" button, and Contact has an "Export support" topic; the owner declined a manufacturer path (11.11).
- Supply page lacks the international-buyer opening (6.1), the item lines under each group (6.3) and the 81-province statement (6.7).
- Knowledge Notes cards contain placeholder and design-note text in page copy ("Example: ...", "Events and news live here as a filter"); placeholders must stay out of page text.
- Hub contains design-note copy ("One table for every sector").
- No language switcher and no /en or /tr structure; one page title for all states, so no per-page title or description (10.5, 10.11).

Weaknesses:

- Sector tables link to nothing; one cell says "see table below".
- No cross-links between pages except the menu and CTAs; notes link nowhere.
- Four CTA labels in use ("Plan a technical meeting", "Contact us", "Request an offer", "Contact us as a manufacturer").
- Home page repeats the same CTA twice with nothing between them that changes the visitor's decision.
- Supply shows process before scope; a procurement reader looks for scope first.
- Supply groups are bare titles; five of six cards have no content.
- Knowledge Notes filters are the names of dimensions (Asset, Method, Sector, Format), not selectable values.
- Contact headline "Plan a technical meeting" also serves supply requests, where it does not fit.
- WhatsApp button links to the contact page itself; no role name or hours.
- Privacy notice is mentioned but not linked; no phone-optional field; no confirmation step.
- Sector label "Distribution" is ambiguous; use "Distribution utilities".
- Trust strip styles "Megger" as a statistic, which reads as a claim rather than a relationship.
- Header has five items with no route to technology or sector pages.

## 2. Sitemap

Root `/` redirects to `/en/`. `x-default` hreflang points to `/en/`. Turkish slugs are ASCII (no ı, ş, ğ, ü, ö, ç). The /tr tree is built as drafts and published together; the language switcher stays hidden until then.

| # | Page | /en slug | /tr slug | Purpose | Primary CTA |
|---|---|---|---|---|---|
| 1 | Home | `/en/` | `/tr/` | Say what Glinker does in five seconds and route to one of two lines | Request a technical meeting |
| 2 | Online Monitoring (hub) | `/en/online-monitoring/` | `/tr/online-izleme/` | Map asset and risk to technology; route to technology or sector | Request a technical meeting |
| 2.1 | Partial Discharge Monitoring | `/en/online-monitoring/partial-discharge-monitoring/` | `/tr/online-izleme/kismi-desarj-izleme/` | Method, product section (ICMobserver), datasheet values | Request a technical meeting |
| 2.2 | DGA Monitoring | `/en/online-monitoring/dga-monitoring/` | `/tr/online-izleme/dga-izleme/` | Method, product section (InsuLogix G2) | Request a technical meeting |
| 2.3 | Cable and MV Monitoring | `/en/online-monitoring/cable-and-mv-monitoring/` | `/tr/online-izleme/kablo-ve-og-izleme/` | Method, product sections (Greenlight, MGA/MS5200) | Request a technical meeting |
| 2.4 | Distribution Transformer and Power Quality | `/en/online-monitoring/distribution-transformer-and-power-quality/` | `/tr/online-izleme/dagitim-trafosu-ve-guc-kalitesi/` | Method, product sections (TrafoStick TS G2, PQI-DA Smart) | Request a technical meeting |
| 2.5 | Asset Management | `/en/online-monitoring/asset-management/` | `/tr/online-izleme/varlik-yonetimi/` | Fleet-level view, product section (Megger APM/IPS) | Request a technical meeting |
| 2.6 | Sectors parent (redirect only) | `/en/online-monitoring/sectors/` | `/tr/online-izleme/sektorler/` | 301 to hub `#sectors`; not in XML sitemap | none |
| 2.6.1 | Data Centers | `/en/online-monitoring/sectors/data-centers/` | `/tr/online-izleme/sektorler/veri-merkezleri/` | Sector power chain: asset, consequence, technology link | Request a technical meeting |
| 2.6.2 | Airports | `/en/online-monitoring/sectors/airports/` | `/tr/online-izleme/sektorler/havalimanlari/` | Same template | Request a technical meeting |
| 2.6.3 | Distribution Utilities | `/en/online-monitoring/sectors/distribution-utilities/` | `/tr/online-izleme/sektorler/dagitim-sirketleri/` | Same template | Request a technical meeting |
| 3 | Supply & Project Solutions | `/en/supply-and-project-solutions/` | `/tr/tedarik-ve-proje-cozumleri/` | Fixed scope (six groups) and working method; sector-independent | Send your requirement |
| 4 | Knowledge Notes (index) | `/en/knowledge-notes/` | `/tr/bilgi-notlari/` | Filterable library; includes news and events as a format | Open a note |
| 4.x | Note | `/en/knowledge-notes/{note-slug}/` | `/tr/bilgi-notlari/{not-slug}/` | One note or one source summary | Glinker note: related technology page. Source summary: original source |
| 5 | About | `/en/about/` | `/tr/hakkimizda/` | Who Glinker is, Megger relationship, Trade Facilitator both sides | Request a technical meeting |
| 6 | Contact | `/en/contact/` | `/tr/iletisim/` | Single conversion point for all pages | Send (form) |
| 6.1 | Thank you (noindex) | `/en/contact/thank-you/` | `/tr/iletisim/tesekkurler/` | Confirmation and conversion measurement | Back to where the visitor came from |
| 7 | Privacy notice (KVKK) | `/en/privacy-notice/` | `/tr/kvkk-aydinlatma-metni/` | Legal; holds the full address | none |

Build notes:

- Product anchors are stable and identical in both languages: `#icmobserver`, `#insulogix-g2`, `#greenlight`, `#mga-ms5200`, `#trafostick-ts-g2`, `#pqi-da-smart`, `#megger-apm-ips`. A new product (after the Doble and Megger merger) is one more section and anchor on an existing technology page; no new URL.
- Contact accepts `?topic=monitoring|supply|other` and `&ref={page-slug}` so the form opens preselected and the source page is recorded.
- Page 2.4 holds two different search intents on one URL (fixed decision). Each half gets its own H2 and anchor so it can be split into two pages later with a redirect.
- Knowledge Notes: one custom post type with four taxonomies (technology, asset, sector, format). Taxonomy term slugs equal the technology and sector page slugs, so those pages pull "related notes" by tag with no manual linking. Taxonomy archive pages are noindex in v1.
- Footer: location (Ankara, Türkiye), e-mail, WhatsApp (role name, hours), privacy notice link, language switcher when /tr is live. No menu repeat. No LinkedIn until the page is active.

## 3. Flow algorithm

Rule: at most three page steps from entry to form; every path ends on Contact with the topic preselected.

| Visitor | Likely entry | Step 1 | Step 2 | Step 3 | CTA |
|---|---|---|---|---|---|
| Data center operator | Direct link from outreach, or search | Sector: Data Centers | Technology page named in the row they care about (PD, DGA or power quality) | Contact (`topic=monitoring`) | Request a technical meeting |
| Airport operator | Direct link from outreach, or search | Sector: Airports | Technology page (PD/DGA or cable and MV) | Contact | Request a technical meeting |
| Distribution utility | Direct link, or home | Sector: Distribution Utilities | Distribution Transformer and Power Quality, or Asset Management | Contact | Request a technical meeting |
| Any of the three arriving on Home | Home | Online Monitoring card, sector link | Sector page | Contact (technology page optional) | Request a technical meeting |
| Procurement / EPC | Home or direct | Supply & Project Solutions (scope groups first) | Contact (`topic=supply`) | none | Send your requirement |
| Foreign buyer | Home (Trade Facilitator line) | Supply & Project Solutions (opening section addresses international buyers) | About (optional legitimacy check) | Contact (`topic=supply`) | Send your requirement |
| Turkish manufacturer | Home, then menu | About (manufacturer block) | Contact (`topic=other`) | none | Request a technical meeting label is replaced by a plain text link "Contact us" inside the block |
| Technical engineer searching a technology | Search, lands on a technology page or a note | Technology page (product section, datasheet values) | Related note (optional) | Contact (`topic=monitoring`) | Request a technical meeting |
| Engineer landing on a note | Note | Related technology page | Contact | none | Request a technical meeting |

Decision logic in one line: **knows their sector → sector page; knows their asset → hub table; knows the technology or product → technology page; buying materials → supply; everything else → contact.**

The Turkish manufacturer path is deliberately not optimised (owner: manufacturers will not find Glinker through the site).

## 4. Internal links

### One place per piece of information

| Information | Only home | Others do |
|---|---|---|
| Why online monitoring (common frame) | Hub, section 1 | link |
| Asset class × risk × what differs | Hub master table | link to `#assets` |
| Method explanation, standards, online vs periodic | Technology page | link |
| Product facts and datasheet values | Product section on technology page | name as link label only |
| Sector power chain and consequence | Sector page | hub shows a title and one line |
| Sector context (regulation, public incident) | Sector page paragraph, detail in a note | link |
| Why now in Türkiye | Hub, one paragraph | notes may expand it |
| Supply scope (six groups, items) | Supply page | home shows one sentence |
| Define, Build, Run | Supply page | not repeated on home or About |
| Trade Facilitator, both sides | About | home shows label and one line |
| Megger relationship statement | About | home trust strip shows three words; technology pages show maker attribution only |
| 18+ years, 81 provinces | Home trust strip | About may reference, not restate as a second strip |
| Contact details, form, WhatsApp | Contact (footer shows short form of the same data) | CTA bands link |
| Full address | Privacy notice | nowhere |

### Link table

| From | To | Anchor intent |
|---|---|---|
| Header (all pages) | Hub, Supply, Notes, About, Contact | Literal page names |
| Header dropdown | Five technology pages, three sector pages | Technology name; sector name |
| Home, monitoring card | Hub | See the monitoring line |
| Home, monitoring card | Three sector pages | Sector name |
| Home, supply card | Supply | See scope and method |
| Home, featured notes | Three notes | Note title |
| Home, CTA band | Contact | Request a technical meeting |
| Hub, master table rows | Technology page | Technology name per asset row |
| Hub, technology row | Five technology pages | Technology name |
| Hub, sector strip | Three sector pages | Sector name |
| Hub, other sectors block | Contact (`topic=monitoring`) | Discuss your facility |
| Hub, why-now paragraph | External sources (new tab) | Source name |
| Hub, related notes | Notes filtered by monitoring | Note title |
| Technology page, breadcrumb | Hub | Online Monitoring |
| Technology page, "where it applies" | Sector pages that use it | Sector name |
| Technology page, related technology | One complementary technology page (PD ↔ DGA; cable ↔ PD; distribution ↔ asset management) | Technology name |
| Technology page, related notes | Notes with the same technology tag | Note title |
| Technology page, CTA | Contact (`topic=monitoring&ref=...`) | Request a technical meeting |
| Sector page, table rows | Technology page product anchor | Technology name, product name |
| Sector page, breadcrumb | Hub `#sectors` | Online Monitoring |
| Sector page, related notes | Notes with the same sector tag | Note title |
| Data Centers page only | Supply `#data-center-and-ups` | Passive infrastructure and UPS supply |
| Supply, data center group only | Sector: Data Centers | Monitoring for data center power |
| Supply, CTA | Contact (`topic=supply`) | Send your requirement |
| Notes index, card | Note | Note title |
| Note (Glinker) | Related technology page, related sector page | Technology name; sector name |
| Note (source summary) | Original source (external), related technology page | Read the original; technology name |
| About, buyer line | Supply | See supply scope |
| About, manufacturer block | Contact (`topic=other`) | Contact us |
| About, monitoring line | Hub | See the monitoring line |
| Contact | Privacy notice | Privacy notice |
| Footer | Contact, Privacy notice, WhatsApp | Literal |

Not linked on purpose: Supply does not link to sector pages (except the data center pair above); sector pages do not link to each other; technology pages do not link to Supply.

## 5. Section order per template

### Home (5)

1. **Hero.** Logo left; eyebrow "Trade Facilitator" with one-line explanation; headline naming the two lines and the field; one supporting sentence; single CTA.
2. **Two lines.** Two equal cards. Online Monitoring: one sentence, link to hub, and three sector links inside the card. Supply & Project Solutions: one sentence, link.
3. **Trust strip.** Three static items: strategic partner of Megger; 81 provinces; 18+ years.
4. **Featured notes.** Three hand-picked notes, one per priority sector; each shows title and tags only.
5. **CTA band.** One sentence, one button, WhatsApp as a text link.

### Online Monitoring hub (5)

1. **Scope.** Literal H1 "Online Monitoring"; one sentence listing assets covered; two or three sentences giving the common reason for online monitoring, written once.
2. **Asset table and technologies (`#assets`).** One table: asset class, main risk, what is different for this asset, technology (link). Rows: power transformer, generator and rotating machine, GIS, HV/MV cable, distribution transformer, network and supply quality, whole fleet. Under it, a row of five technology links.
3. **Sectors (`#sectors`).** Three sector cards (name, one line, link). Below, one short block naming the other sectors with a contact link.
4. **Why now in Türkiye.** One paragraph with linked sources; followed by two or three related notes.
5. **CTA band.** One button; one sentence that other solutions and field test instruments can also be discussed.

### Technology page (5)

1. **What it detects.** H1 is the technology name; one sentence: which fault, on which assets; breadcrumb to hub.
2. **Method.** How the measurement works, when continuous monitoring is justified over periodic testing, relevant standards cited by number.
3. **Products.** One repeatable block per product, each with an anchor: name and maker, role in one sentence, four to six datasheet values labelled "per manufacturer data", system components, communication and integration. A second product is a second block.
4. **Where it applies.** Asset classes it serves, links to the sector pages that use it, one complementary technology.
5. **Related notes and CTA.** Notes by tag; one button.

### Sector page (4, at most 400 words)

1. **Power chain.** H1 is the sector name with "online monitoring"; one or two sentences describing the sector's critical electrical chain; breadcrumb.
2. **Table.** Asset in this sector, what an outage means here, technology (link), product (name, link to anchor). Three to five rows. No method text, no values.
3. **Context.** One sourced paragraph: regulation or public incident specific to the sector. Data Centers only: one line linking to the supply data center group.
4. **Related notes and CTA.** Notes by sector tag; one button.

### Supply & Project Solutions (5)

1. **Opening.** H1; one sentence defining the solution-partner role; one sentence addressed to international and domestic project owners (single access to Turkish manufacturers, alternatives in quality and lead time).
2. **Scope.** Six numbered groups, each with its items on one line separated by "·"; the data center and UPS group carries an anchor and the only sector link.
3. **How it works.** Define, Build, Run: three steps, one line each.
4. **Reach.** 81-province manufacturer access and the invitation to start a preliminary study for items where an alternative is sought.
5. **Other needs and CTA.** The single sentence for engineering and project design, building systems, software and cyber security; one button.

### Knowledge Notes index (3)

1. **Header.** H1 and one sentence stating what the library holds.
2. **Filters.** v1 shows two filter rows with real values: Technology and Sector. Format appears as a badge on the card and as a third filter once there are more than about twelve items. Asset is stored as a taxonomy but not shown as a filter until volume justifies it.
3. **Card grid.** Each card: format badge (Glinker note, source summary, news and event), title, two-line summary, tags, source name, reading time.

### Note (4)

1. **Header.** Title, format badge, source, date, tags.
2. **Body.** Glinker note: full text. Source summary: three points (what it says, why it matters, who it is for) and the link to the original; no embedded player.
3. **Related.** One technology page and, if tagged, one sector page.
4. **Next.** Two related notes; a text link to Contact, no button band.

### About (4)

1. **Who.** H1; two or three sentences: Ankara-based engineering and supply company, two lines, each linked to its page.
2. **Megger partnership.** The relationship statement in approved wording and its scope; maker brands supplied through it.
3. **Trade Facilitator.** Slogan; two sentences, one per side; buyer side links to Supply; manufacturer block with a text link to Contact.
4. **How we work and CTA.** Short statement of working principles (finding first, technically honest); one button.

### Contact (3)

1. **Header.** H1 that fits both lines (not "technical meeting" only); one sentence on what happens after sending.
2. **Form.** Name, corporate e-mail, organisation, topic (Online monitoring, Supply and projects, Other), short note; phone optional; privacy notice link at the consent line. Topic preselected from the URL.
3. **Direct channels.** E-mail, WhatsApp with role name and hours, "Ankara, Türkiye", meetings by appointment or online. Phone shown only once confirmed.

## 6. Questions for the owner

1. **Supply item list as a PDF.** 6.8 was approved, but the later decision says no downloads in v1. A: one-page PDF of the six groups available in v1. B: on-page list only, PDF later. (Recommended: B.)
2. **Glinker's own notes.** Your answer in 11.8 reads as if Glinker should not add its own notes. Should the three notes approved in 7.5 ("Invisible Infrastructure", PD/DGA, data center reliability) be published in full in v1? Yes / No (if No, the library opens with source summaries only).
3. **Public incident briefs.** May sector pages and notes use incidents from public sources (for example the Heathrow substation fire), clearly marked as public information with no Glinker involvement? Yes / No. (Recommended: Yes; this is the only form of "case" compatible with the no-reference rule.)
4. **Megger logo.** A: the wording "strategic partner" plus the Megger logo on Home and About. B: wording only until Megger confirms logo use in writing. (Recommended: B unless the signed letter mentions brand use.)
5. **Contact identity.** The decision list says a role name; in 11.5 you leaned towards a first name. A: role ("Coordination"). B: first name. (Recommended: A on the site, first name in the WhatsApp greeting.)
6. **Response-time promise.** Should the Contact page state a reply within two business days? Yes / No.

Not a question but a consequence to plan for: distribution utilities are a priority sector and read Turkish. When /tr opens, the monitoring hub, the Distribution Utilities page and page 2.4 should be the first Turkish pages published.
