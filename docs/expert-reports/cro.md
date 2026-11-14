# Glinker Group — CRO, copy, form, accessibility, bilingual spec

Scope: EN site copy ready to paste, CTA system, form spec, WCAG 2.2 AA checklist, /en–/tr spec, trust rules.
Not legal advice. Items marked **[LEGAL]** need a Turkish lawyer; **[OWNER]** need Ezgi's decision; **[PENDING]** must not be published as-is.

## 0. Conflicts found in the current prototype (fix before anything else)

| Where | Current text | Problem | Replace with |
|---|---|---|---|
| Home trust strip, About | "Authorized distributor" | Banned word (checklist 1.5, 11.1) | "Strategic partnership with Megger" |
| Supply page | Button "Request an offer" | Second primary CTA; implies pricing (9.3) | Site-wide primary CTA (section 2) |
| Supply intro | "run the process on your behalf" | "On your behalf" reads as agency/mandate; same risk as "responsibility" **[LEGAL]** | "through a single point of contact" |
| Form | "By sending, you accept the privacy notice (KVKK)" | A KVKK notice is read, not accepted; bundling notice and consent is a known KVKK error | Section 3.5 |
| Form topic | "Export support" | Unclear who it is for; owner said no manufacturer option (11.11) | Topic list in 3.2 |
| Trust strip | "Provinces reached through local industry networks" | Hints at chambers (8.3) | "provinces of Türkiye within the supplier network" |
| Footer | Full menu repeated | Checklist 2.8 says no repeat | Contact line + legal links only |
| Contact | WhatsApp without role/hours | Needs role and hours (10.9, 11.5) | Section 1.4 |
| Styles | White on cyan SEND; 12–13 px text | Fails contrast; too small | Section 4 |

## 1. Page copy (EN)

### 1.1 Home

**Eyebrow**
`Trade Facilitator` · One point of access between international buyers and Turkish manufacturers

**H1 — three options**
- A. **Solution partner for monitoring and supply in critical electrical infrastructure** (10 words) — **PICK**
- B. Monitoring and supply solution partner for critical electrical infrastructure (9 words)
- C. Critical electrical infrastructure: online monitoring and supply, one solution partner (10 words)

Why A: leads with the positioning word, avoids the four-noun stack in B, and maps one-to-one to Turkish ("Kritik elektrik altyapısında izleme ve tedarik çözüm ortağı").

**Sub-paragraph (33 words)**
Glinker Group brings together online condition monitoring for transformers, cables and rotating machines, in partnership with Megger, and electrical supply and project solutions from Türkiye's manufacturing base, with a single point of coordination.

**Hero button:** Request a technical meeting (see 2.1). No second button; the two cards below are the second path.

**Section heading:** Two lines of work

**Card 1 — Online Monitoring** (29 words)
Continuous condition monitoring for power transformers, generators, cables and distribution networks: partial discharge, dissolved gas, power quality and asset management. See which asset and risk apply to your sector.
Link label: **View online monitoring solutions**

**Card 2 — Supply & Project Solutions** (25 words)
Electrical materials and project solutions from Turkish manufacturers: earthing, cables, MV, panels, lighting and data center power. Specification-matched alternatives, with a single point of coordination.
Link label: **View supply and project solutions**

**Trust strip (static text, no counters)**
1. **Megger** — Strategic partnership for online monitoring solutions
2. **81** — provinces of Türkiye within the supplier network
3. **18+** — years of experience in electrical supply and projects

Notes: Megger logo only if the signed partner letter covers logo use (8.6) **[OWNER]**. "18+ years" is listed as an open question in the brief; owner note 8.3 confirms it — treat as approved, re-confirm once.

**Closing CTA block**
H2: Start with a technical conversation
Text: Share your sector and the asset or supply need you have in mind. Meetings are held online or by appointment.
Button: Request a technical meeting
Text link under button: or write to koordinasyon@glinkergroup.com

### 1.2 Supply & Project Solutions

**H1:** Supply & Project Solutions
**Lead line:** Electrical supply and project needs, with one solution partner.

**Intro**
Glinker Group is a solution partner for electrical material supply and project needs, for project owners, EPC contractors and procurement teams in Türkiye and abroad. It is not a manufacturer. Each need is matched with suitable Turkish manufacturers and specialists, alternatives are offered on specification, quality and delivery time, and you deal with a single point of contact throughout.

**Way of working (Define – Build – Run, re-thought per 6.6)**
Change of logic: each step now states what you bring and what you get, in passive/neutral voice. No "we do", no "on your behalf", no ownership claims. Verbs stay because the owner approved them (decision list), but the step is described by its output.

| Step | What happens | What you get |
|---|---|---|
| **1. Define** | The need is clarified with you: item list, technical specification, applicable standards, target delivery. | A clear scope and a short list of open questions. |
| **2. Build** | Suitable manufacturers and specialists are matched to the scope. Alternatives are set side by side on specification compliance, quality and delivery time. | A comparable proposal. The choice stays with you. |
| **3. Run** | Order, production follow-up, documentation, logistics and delivery are coordinated through a single contact, with commissioning support where the project needs it. | A status you can follow at each stage. |

Line under the table: The scope of each engagement is set out in the agreement. **[LEGAL]** (keeps liability boundary in the contract, per 6.5.)

**Catalogue — section heading:** Supply scope
Six cards, fixed order, items separated by " · ". Item lines below are typical items for each group and **must be checked against the portfolio deck (12.1)** before publishing **[OWNER]**.

1. **Earthing & conduit** — Earthing rods and conductors · earthing tapes · exothermic welding materials · lightning protection components · steel and PVC conduit · cable trays and ladders
2. **Cables & conductors** — LV power cables · MV cables · control and instrumentation cables · halogen-free and fire-resistant cables · bare conductors · joints, terminations and lugs
3. **MV installations** — MV switchgear · distribution transformers · compact substations · surge arresters · insulators · current and voltage transformers
4. **Panels, switchgear & distribution** — Main and sub-distribution panels · MCC and automation panels · busbar systems · circuit breakers and switching devices · power factor correction · metering
5. **Lighting** — Indoor industrial luminaires · outdoor and area lighting · road and tunnel lighting · emergency lighting · poles and masts · lighting control
6. **Data center passive infrastructure & uninterruptible power** — Racks and cabinets · aisle containment · structured cabling · PDU · UPS · ATS/STS

**Single sentence (other topics)**
You can also contact us for needs in engineering and project design, building systems, software and cyber security.

**81-province line (6.7 — show to Ezgi for confirmation as she asked)**
With a supplier network reaching manufacturers across all 81 provinces of Türkiye, a preliminary study can be started for items where you are looking for an alternative product.

**Page end:** primary CTA + secondary "Send your item list by email" (mailto, subject prefilled "Item list – [organization]").

Open point: 6.8 approved a one-page PDF item list, while the decision list says "no brochure download in v1". Recommendation: no PDF in v1; give the page a print stylesheet so the scope prints on one page. **[OWNER]**

### 1.3 About (187 words)

**H1:** About Glinker Group

Glinker Group is an Ankara-based engineering and supply company and a solution partner for critical electrical infrastructure. It works on two lines: online monitoring solutions for critical energy assets, and electrical supply and project solutions.

**Way of working**
Each request starts from the need, not from a product list. The need is defined with you, the solution is built with suitable manufacturers and specialists, and the process runs through a single point of contact. Technical values are quoted as stated in manufacturer datasheets.

**Partnership with Megger**
Online monitoring solutions are offered in strategic partnership with Megger.

**Bridging Cultures, Building Trust**
With 18+ years of experience in electrical supply, the aim is the same in every project: clear and dependable technical and commercial communication between different business cultures.

**Trade Facilitator**
For international buyers: one point of access to Turkish manufacturers, with alternatives in quality and delivery time and follow-up of the supply process, across a network reaching all 81 provinces.

For Turkish manufacturers: where a manufacturer is looking to enter an international market, Glinker Group can help open the relevant network connections. Write to koordinasyon@glinkergroup.com.

Notes
- The manufacturer block is plain text, last on the page, no card, no button, no form option (3.7, 11.11).
- Values: 8.7 approved "Integrity, Responsibility, Collaboration", but "responsibility" is now a banned word. Left out. If wanted: "Integrity · Clarity · Collaboration". **[OWNER]**
- Owner asked whether About is needed at all (10.2, 11.6). Recommendation: keep it, short. The slogan, the Megger line and the two-sided Trade Facilitator explanation need one home, and public-sector buyers look for a "who is this company" page before a first meeting.

### 1.4 Contact

**H1:** Request a technical meeting
**Intro:** Tell us your sector and the asset or supply need you have in mind. Meetings are held online or by appointment.

**Channel block (left column, plain text, no icons-only links)**
- Location: Ankara, Türkiye
- Email: koordinasyon@glinkergroup.com
- WhatsApp · Coordination — weekdays 09:00–18:00 (Türkiye time, UTC+3) — link text "Write on WhatsApp (opens WhatsApp)". Number **[PENDING]**: do not render the link until the Business number exists.
- Phone: **[PENDING — not published; no placeholder digits on the live page]**

Line under channels: Item lists and specifications can be sent to the email address above.
(v1 form has no file upload.)

**Form heading (H2):** Send a request — form per section 3.
**Footer (all pages):** Glinker Group · Ankara, Türkiye · koordinasyon@glinkergroup.com · WhatsApp · Coordination (when live) · Privacy Notice · Cookie Notice · © 2026 Glinker Group. No menu repeat, no LinkedIn.

## 2. CTA system

### 2.1 Primary label

| Option | Türkiye public sector | International buyer | Verdict |
|---|---|---|---|
| Plan a technical meeting / Teknik görüşme planlayın | "Plan" suggests a calendar tool that does not exist; slightly informal | Reads as self-service booking | Second choice |
| **Request a technical meeting / Teknik görüşme talep edin** | "Talep" is the standard formal register; matches what the form does (a request) | Clear, no pressure, no booking expectation | **Pick** (also the wording approved in checklist 2.7 and 3.1) |
| Contact us / Bize ulaşın | Neutral | Generic, no reason to click | Use only as plain link text in the "other topics" sentence |
| Request a quote / Teklif isteyin | Public buyers procure by tender; a quote button is off-register | Implies price lists | Do not use (9.3) |
| Talk to an engineer | — | — | Do not use: implies a team (8.4) |

Use the same label in nav button, hero, page ends, and as the form page H1. Submit button on the form: "Send request" / "Talebi gönder". Every primary CTA links to `/en/contact/?topic=…` so the topic is preselected.

### 2.2 Secondary CTA per page (text link style, never a second filled button)

| Page | Primary | Secondary |
|---|---|---|
| Home | Request a technical meeting | Card links; email link in closing block |
| Online Monitoring | same (`?topic=monitoring`) | "Go to the asset and risk table" (in-page anchor, in hero) |
| Supply & Project Solutions | same (`?topic=supply`) | "Send your item list by email" |
| Knowledge Notes | same, once at page end | "Read the note" / "Open the source (megger.com)" |
| About | same | Email link in the manufacturer line |
| Contact | Send request (form) | Email, WhatsApp |

### 2.3 WhatsApp placement
- Appears only on Contact (channel block) and in the footer. Not in the header, hero, cards, or as a floating bubble.
- Always labelled by role and hours; text link with visible words, `target` not forced; `wa.me` link with a prefilled greeting per language.
- One-line notice next to it linking to the Privacy Notice (WhatsApp is operated by Meta; data may be processed abroad) **[LEGAL]**.
- Not shown in the form success message, so the form stays the formal channel for public buyers.

## 3. Form spec

### 3.1 Fields

Intro line above form: "All fields are required unless marked optional." / "İsteğe bağlı olarak işaretlenmeyen tüm alanlar zorunludur."

| # | Label EN | Label TR | Type / attributes | Req. |
|---|---|---|---|---|
| 1 | Full name | Ad Soyad | text, `autocomplete="name"` | Yes |
| 2 | Work email | Kurumsal e-posta | email, `autocomplete="email"`, `inputmode="email"` | Yes |
| 3 | Organization | Kurum / Şirket | text, `autocomplete="organization"` | Yes |
| 4 | Topic | Konu | select | Yes |
| 5 | Phone (optional) | Telefon (isteğe bağlı) | tel, `autocomplete="tel"` | No |
| 6 | Short note (optional) | Kısa not (isteğe bağlı) | textarea, max 1,500 chars, hint below | No |
| 7 | Privacy line | Aydınlatma satırı | see 3.5 | — |

Hint under field 6: "Sector, asset type or item list summary helps prepare the meeting." / "Sektör, varlık türü veya malzeme listesi özeti görüşme hazırlığını kolaylaştırır."
Hint under field 2: none. Do not block free-mail domains (many SMEs and some public staff use them); label alone steers behaviour.
No country, title, sector or file-upload fields in v1 (data minimisation; fewer fields).

### 3.2 Topic options

| Value | EN | TR |
|---|---|---|
| (empty) | Select a topic | Konu seçin |
| monitoring | Online monitoring | Online izleme |
| supply | Supply and project solutions | Tedarik ve proje çözümleri |
| sourcing | Sourcing from Türkiye (international buyers) | Türkiye'den tedarik (yurt dışı alıcılar) |
| other-topics | Engineering, building systems, software or cyber security | Mühendislik, bina sistemleri, yazılım veya siber güvenlik |
| other | Other | Diğer |

No "I am a manufacturer" option (11.11). Preselect from `?topic=`.

### 3.3 Validation behaviour
- Works without JavaScript: normal POST, server-side validation, same page re-rendered with errors (10.8).
- Validate on submit; after the first submit, re-validate a field on blur. No validation while typing.
- On error: summary box at top of form (`role="alert"`, `tabindex="-1"`, receives focus) listing errors as links to fields; each field gets `aria-invalid="true"` and its message linked with `aria-describedby`. Error shown by text plus icon, not colour alone. Entered values are kept.
- Use custom messages, not browser defaults (browser messages follow browser language, not page language). Add `novalidate` and handle in script + server.

| Case | EN | TR |
|---|---|---|
| Summary | Please check the fields below. | Lütfen aşağıdaki alanları kontrol edin. |
| Name empty | Enter your full name. | Adınızı ve soyadınızı yazın. |
| Email empty | Enter your work email address. | Kurumsal e-posta adresinizi yazın. |
| Email format | Enter an email address in the format name@organization.com. | E-posta adresini ad@kurum.com biçiminde yazın. |
| Organization empty | Enter the name of your organization. | Kurum veya şirket adını yazın. |
| Topic empty | Select a topic. | Bir konu seçin. |
| Phone format | Enter the phone number with country code, for example +90 …, or leave it empty. | Telefon numarasını ülke koduyla (örneğin +90 …) yazın ya da boş bırakın. |
| Note too long | Shorten the note to 1,500 characters. | Notu 1.500 karakterle sınırlayın. |
| Send failed | Your request could not be sent. Try again, or write to koordinasyon@glinkergroup.com. | Talebiniz gönderilemedi. Yeniden deneyin ya da koordinasyon@glinkergroup.com adresine yazın. |

### 3.4 Success message
Shown in place of the form (`role="status"`, focus moved to its heading). Also sent as an acknowledgement email.

Without the promise (use now):
- EN: **Your request has been received.** Thank you. We will reply to the email address you provided. For anything urgent, write to koordinasyon@glinkergroup.com.
- TR: **Talebiniz alındı.** Teşekkür ederiz. Belirttiğiniz e-posta adresi üzerinden size dönüş yapılacaktır. Acil konular için koordinasyon@glinkergroup.com adresine yazabilirsiniz.

With the promise (only after owner approval **[OWNER]**):
- EN: **Your request has been received.** Thank you. We will reply within 2 business days to the email address you provided.
- TR: **Talebiniz alındı.** Teşekkür ederiz. Belirttiğiniz e-posta adresi üzerinden 2 iş günü içinde size dönüş yapılacaktır.

### 3.5 KVKK wording — DRAFT, NEEDS LAWYER APPROVAL **[LEGAL]**

Principle: under KVKK the information notice (aydınlatma) and explicit consent (açık rıza) are separate. Answering a request normally does not rest on consent, so a mandatory "I accept" box is the wrong pattern. v1 therefore has an information line, not an acceptance, and no marketing opt-in.

Line above the submit button (no checkbox):
- EN: Your personal data is processed by Glinker Group as data controller, only to respond to your request. Details are in the [Privacy Notice (KVKK)].
- TR: Kişisel verileriniz, veri sorumlusu sıfatıyla Glinker Group tarafından yalnızca talebinizi yanıtlamak amacıyla işlenir. Ayrıntılı bilgi için [KVKK Aydınlatma Metni]'ni inceleyebilirsiniz.

If the lawyer wants proof of notice, add a required checkbox (not a consent):
- EN: I have read the Privacy Notice.
- TR: Aydınlatma Metni'ni okudum.

Only if marketing messages are ever planned — separate, optional, unticked:
- EN: I agree to receive information emails from Glinker Group. I can withdraw this at any time.
- TR: Glinker Group'tan bilgilendirme e-postaları almayı kabul ediyorum. Bu onayı dilediğim zaman geri alabilirim.

Questions for the lawyer: legal basis for the form; legal entity title to name as controller (site says "Glinker Group"); VERBİS registration status; transfers abroad (Hostinger hosting, email provider, WhatsApp/Meta) under KVKK art. 9 as amended; retention period for form entries; whether GDPR applies to requests from EU buyers; commercial-message rules (Law 6563 / İYS) if a newsletter is added; mandatory company information on the website under the Turkish Commercial Code.

### 3.6 Privacy Notice page — headings only
1. Data controller (legal title, full address, contact)
2. Personal data we process
3. Purposes of processing
4. Legal basis
5. How the data is collected
6. Recipients and transfers, including transfers abroad
7. Retention period
8. Your rights (KVKK Article 11)
9. How to submit a request to the data controller
10. Contact through WhatsApp
11. Cookies (link to Cookie Notice)
12. Last updated

The full office address appears only here (3.9). A Turkish version is needed even while the site is English-only (see 5.3).

### 3.7 Spam protection without accessibility cost
1. Honeypot text field: visually hidden wrapper, `aria-hidden="true"`, `tabindex="-1"`, `autocomplete="off"`, neutral field name. Submissions with a value are dropped silently.
2. Time check: reject submissions sent under 3 seconds after render, with the normal "try again" message.
3. Server-side rate limit per IP and nonce check; link count limit in the note field.
4. If spam persists: a content filter on the server or a non-interactive challenge. No image/puzzle CAPTCHA. Avoid reCAPTCHA v3 in v1 (third-party cookies and transfer abroad add consent work).

### 3.8 Lead routing
- To: koordinasyon@glinkergroup.com. Subject: `[Web] {Topic} – {Organization}`. Reply-To: sender's address. Body includes page language and source page.
- Send through authenticated SMTP on the glinkergroup.com mailbox; SPF, DKIM and DMARC set, otherwise leads land in junk. Test before launch, since the address is described as a test address (10.9).
- Internal copy to a second mailbox (not shown on site) so a single absence does not lose a lead **[OWNER]**.
- Store entries in WordPress only if a retention period is defined **[LEGAL]**; otherwise email only.
- Acknowledgement email to sender with the success text, in the page language.
- No analytics event may contain personal data; fire a plain "form sent" event only.

## 4. Accessibility checklist (WCAG 2.2 AA) for this design

### 4.1 Contrast (computed, WCAG relative luminance)

| Pair | Ratio | Normal text 4.5 | Large text / UI 3.0 | Result |
|---|---|---|---|---|
| Cyan #2fc1ff on white | 2.06 | Fail | Fail | **Fail** — not for text, icons, borders or focus rings on white |
| White on cyan #2fc1ff (current SEND button) | 2.06 | Fail | Fail | **Fail** |
| Cyan #2fc1ff on navy #1a315e | 6.20 | Pass | Pass | Pass AA (not AAA) |
| Body #585858 on white | 7.11 | Pass | Pass | Pass AA and AAA |
| #dbe3f2 on navy #1a315e | 9.90 | Pass | Pass | Pass AA and AAA |
| White on navy #1a315e | 12.77 | Pass | Pass | Pass |

### 4.2 Minimal fixes that keep the identity

| Use | Now | Fix | Ratio |
|---|---|---|---|
| Cyan button (SEND, primary CTA) | White text on #2fc1ff | **Navy #1a315e text on #2fc1ff**; square corners kept | 6.20 |
| Button hover/active | — | Background navy #1a315e, text white | 12.77 |
| Cyan headings, eyebrows, links on white | #2fc1ff | **Text cyan #0077a8** (same hue, darker) | 5.00 on white; 4.62 on #f4f6fa |
| Links in body | — | #0077a8, underlined; hover navy | 5.00 |
| Eyebrow / accents on navy or on the navy gradient cards | #2fc1ff | Keep #2fc1ff | 6.20 (7.13 on #0f2559) |
| Input borders | Light/cyan | #6b7688, 1 px; focus state per 4.4 | 4.59 |
| Error text and border | — | #b3261e plus icon and text | 6.54 |
| Decorative cyan (diagonal stripe, rules, card top borders) | #2fc1ff | Keep; decoration is exempt, must not carry meaning | — |

Rule of thumb for the builder: #2fc1ff is a fill and an on-navy colour only; #0077a8 is the on-white text colour; navy is the text colour on cyan.
Minimum sizes: body 16 px, small print 14 px (prototype has 12–13 px; raise). Text over the hero image or gradient needs a solid or ≥ 87 % navy backing so the ratio holds over any pixel.

### 4.3 Headings and structure
- One `<h1>` per page (prototype has 6 because pages are states; each real URL gets exactly one).
- No skipped levels: section headings `<h2>`, cards and steps `<h3>`. Eyebrow "Trade Facilitator" is a `<p>`, not a heading. Trust-strip numbers are `<p>`/`<dl>`, not headings.
- Landmarks: `<header>`, `<nav aria-label="Main">`, `<main id="main">`, `<footer>`. "Skip to content" link as first focusable element.
- Page `<title>` unique: "Online Monitoring – Glinker Group".

### 4.4 Focus
- `:focus-visible { outline: 3px solid #1a315e; outline-offset: 2px; }` on light backgrounds; on navy sections `outline-color: #2fc1ff`. Never `outline: none` without replacement (Elementor themes often remove it).
- Focus not hidden behind a sticky header: `scroll-padding-top` equal to header height (2.4.11).
- Focus order follows visual order; mobile menu closed state is not focusable.

### 4.5 Tables (asset × risk × method × product; sector tables)
- Real `<table>` with `<caption>`, `<thead>`, `<th scope="col">`; first cell of each row `<th scope="row">`. No layout tables, no div grids for data.
- Sector tabs: either real links to separate URLs (preferred) or the ARIA tabs pattern with arrow-key support; content must be in the HTML without JavaScript (10.12).
- Mobile: wrapper with `overflow-x: auto`, `tabindex="0"`, `role="region"`, `aria-label` equal to caption; or stacked cards that repeat the column label per cell. No text below 14 px to make it fit.
- "According to manufacturer data" is visible text, not a tooltip.

### 4.6 Links and buttons
- Link text says the destination: "View online monitoring solutions", not "Read more" or "→" alone. Arrows are decorative (`aria-hidden`).
- A whole card may be clickable, but with one link inside (heading or link label), not nested links.
- External links name the site: "Open the source (megger.com)". Email and WhatsApp links show the address/role as text.
- Links are `<a>`, actions are `<button>`. Logo link has `alt="Glinker Group – home"`.

### 4.7 Language attributes
- `<html lang="en">` on /en/, `<html lang="tr">` on /tr/. Mixed fragments marked inline: `<span lang="tr">KVKK Aydınlatma Metni</span>` on EN pages; `<span lang="en">Trade Facilitator</span>` and the slogan on TR pages. Language switcher links carry `lang` and `hreflang`.

### 4.8 Motion
- v1 has no counters, sliders, autoplay or parallax. Any later motion (step 2 design phase) must sit inside `@media (prefers-reduced-motion: no-preference)` and never be needed to read content; nothing moves for more than 5 s without a pause control.

### 4.9 Mobile
- Tap targets at least 44 × 44 px for nav, buttons, form controls, footer links (AA minimum is 24 × 24; 44 is the safer build target). 8 px spacing between adjacent links.
- Form inputs 16 px font (prevents iOS zoom); labels above fields, always visible; no placeholder-as-label.
- Reflow at 320 px width without horizontal page scroll; text resizable to 200 %.
- Nav on mobile: `<button aria-expanded aria-controls>` labelled "Menu"; panel pushes content or is a simple full-width list (5 items + CTA + language); Esc closes; focus returns to the button. No hover-only submenus; with five flat items no submenu is needed.
- Sticky header at most 64 px on mobile; no sticky bottom bar.

### 4.10 Other
- Images: logo and product photos with meaningful `alt`; decorative stripes `alt=""`/CSS background.
- Cookie banner (if any non-essential cookie exists): not a modal trap, keyboard reachable, equal-weight "Accept" and "Reject" buttons, does not cover the focus target. If the site uses no non-essential cookies in v1, no banner is needed, only the Cookie Notice **[LEGAL]**.
- Test before launch: keyboard-only pass, screen reader pass on the form (NVDA or VoiceOver), automated scan on every template, zoom 200 %, both languages.

## 5. Bilingual spec

### 5.1 URL structure
Same tree in both languages, language as first path segment, translated ASCII slugs (no ı, ş, ğ, ö, ü, ç in URLs).

| EN | TR |
|---|---|
| /en/ | /tr/ |
| /en/online-monitoring/ | /tr/online-izleme/ |
| /en/supply-project-solutions/ | /tr/tedarik-ve-proje-cozumleri/ |
| /en/knowledge-notes/ | /tr/bilgi-notlari/ |
| /en/about/ | /tr/hakkimizda/ |
| /en/contact/ | /tr/iletisim/ |
| /en/privacy-notice/ | /tr/kvkk-aydinlatma-metni/ |
| /en/cookie-notice/ | /tr/cerez-bildirimi/ |

- Root `/` redirects (301) to `/en/`. No automatic redirect by IP or browser language; search engines and shared links must land where the URL says.
- x-default points to the EN page.
- Sector or product sub-pages follow the same pattern under their parent.
- On WordPress use a multilingual plugin in directory mode that pairs pages one-to-one and outputs hreflang itself; do not hand-code tags in Elementor.

### 5.2 hreflang examples
On `/en/online-monitoring/` and identically on `/tr/online-izleme/` (each page lists all versions, itself included):

```html
<link rel="alternate" hreflang="en" href="https://www.glinkergroup.com/en/online-monitoring/">
<link rel="alternate" hreflang="tr" href="https://www.glinkergroup.com/tr/online-izleme/">
<link rel="alternate" hreflang="x-default" href="https://www.glinkergroup.com/en/online-monitoring/">
<link rel="canonical" href="https://www.glinkergroup.com/en/online-monitoring/">
```

Rules: absolute URLs; return tags on both sides; canonical is self-referencing per language (never TR canonical to EN); use `tr`, not `tr-TR`; same pairs repeated in the XML sitemap; `og:locale` `en_US` / `tr_TR`.

### 5.3 While TR is not published
- Emit only `hreflang="en"` and `x-default` (both to the EN URL). No `hreflang="tr"` to pages that do not exist.
- Hide the language switcher entirely. A greyed "TR – coming soon" breaks the "no coming soon labels" rule (4.6) and is a dead control for keyboard users.
- Exception: the Turkish KVKK notice. Publish `/tr/kvkk-aydinlatma-metni/` at EN launch and link it from the footer and the form as `<a lang="tr" hreflang="tr">KVKK Aydınlatma Metni (Türkçe)</a>` **[LEGAL]**.
- Launch TR as a complete tree in one go; then switch on hreflang pairs and the switcher together.

### 5.4 Language switcher behaviour (once TR is live)
- Position: header, right of the nav; repeated in the mobile menu. Text labels "EN" / "TR" with `aria-label="English"` / `aria-label="Türkçe"`; no flags.
- Each option links to the same page in the other language, not to the home page. Current language marked `aria-current="true"` and not a link.
- If a specific page has no translation (for example a Knowledge Note published only in English, 7.8): the switcher goes to the parent listing in the other language, and the listing shows the note with an "(English)" tag.
- Choice is not stored in a cookie; the URL is the state. Query strings (`?topic=`) carry over.

### 5.5 Strings that must be translatable (no hard-coded text in templates)
- Navigation labels, skip link, "Menu", language names, `alt` texts, page titles and meta descriptions.
- Primary and secondary CTA labels.
- Form: labels, hints, option texts, all error messages, summary, success message, acknowledgement email subject and body, privacy line.
- Footer: location line, WhatsApp role and hours, legal link labels, copyright line.
- Cookie banner and Cookie Notice; 404 page; search/filter labels and tag vocabulary in Knowledge Notes; table captions and column headers; "According to manufacturer data" label; "(optional)"; "opens WhatsApp"; external-link notes.
- WhatsApp prefilled greeting, mailto subjects.
- Keep "Trade Facilitator", "Bridging Cultures, Building Trust", product names (ICMobserver, InsuLogix G2 …) and "Megger" untranslated, wrapped in `lang="en"` on TR pages.

### 5.6 Turkish typography pitfalls
- `text-transform: uppercase` (used in three places in the prototype): with `lang="tr"` the browser correctly maps i → İ and ı → I. Without `lang="tr"` "iletişim" becomes "ILETIŞIM" (wrong). So set `lang` on `<html>` and on any Turkish fragment inside EN pages.
- The reverse case: English words inside a TR page get Turkish casing. "Trade Facilitator" becomes "TRADE FACİLİTATOR" and "Glinker" becomes "GLİNKER". Wrap brand and English terms in `lang="en"`, or do not apply uppercase transforms to them. Safer overall: type eyebrow text in the intended case and drop `text-transform` on TR templates.
- Same rule in scripts: use `toLocaleUpperCase('tr')` / `toLocaleLowerCase('tr')` for Turkish strings (filters, search), never the default functions.
- Fonts: load the `latin-ext` subset of Jost and Roboto, otherwise ğ, ş, İ, ı fall back to another font mid-word. Check Jost 500 at heading sizes for İ and ğ clipping with tight `line-height` (use ≥ 1.2).
- Turkish strings run longer (often +20–30 %): no fixed-width buttons or nav items; allow wrapping; test the nav with "Tedarik ve Proje Çözümleri".
- Formats: decimal comma and dot thousands in TR (1.500), 24-hour times in both, dates as "14 Kasım 2026" / "14 November 2026". Write "Türkiye" in both languages.
- Apostrophe with proper names in Turkish ("Glinker Group'un", "Megger'in"); use the straight or typographic apostrophe consistently, never a backtick.
- Do not translate by machine and publish; public-sector readers notice register errors. Use the formal "siz" form throughout.

## 6. Trust without references

### 6.1 May be shown — ranked, maximum six
1. **Megger partnership line** — "Strategic partnership with Megger", linked to megger.com; logo only within the signed partner letter's terms. A. Eberle products appear under the Megger heading (11.2).
2. **Named products with sourced values** — ICMobserver, InsuLogix G2 etc., values only as in datasheets and labelled "According to manufacturer data"; methods tied to the relevant standards (IEC 60270 for partial discharge, IEC 60599 / IEEE C57.104 for DGA, EN 50160 / IEC 61000-4-30 for power quality) as method references, not as certificates held.
3. **Knowledge Notes** — own analytical notes and short original summaries with links to the source (Megger, CIGRE by number and title). Shows competence without naming a customer.
4. **Transparent way of working** — Define – Build – Run with stated outputs, "the choice stays with you", scope set in the agreement, and the plain statement that Glinker Group is not a manufacturer.
5. **Two verified numbers, static** — 18+ years, 81 provinces. Text, not counters.
6. **Reachable, identifiable company** — legal entity and Ankara location, corporate-domain email, role-named WhatsApp with hours, working form, KVKK notice, a site with no dead links or typos. For public buyers this basic hygiene is itself a trust signal.

### 6.2 Must not be shown
- Customer names, logos, "institutions we work with", sector-of-client lists, testimonials.
- Case studies, pilots, field results (including Karakoçan), event photos presented as proof.
- Team section, personal names, personal phone or email.
- "Distributor" in any form; any authorization claim for field test instruments.
- Superlatives and catch-alls: leader, best, one-stop, turnkey, "we do everything".
- "Responsibility", "consultancy", "we did / we do" claims; tier model.
- Chamber or TOBB relationship, member or "companies reached" figures.
- Animated counters, sliders, pop-ups, floating chat bubble, autoplay video.
- Certificate, ISO, IEC, CIGRE or association badges not actually held or licensed.
- Prices, discounts, competitor comparisons.
- Stock photos with hard hats or plant silhouettes.
- LinkedIn link or icon until the page is active.
- Phone number or WhatsApp number until confirmed; the "2 business days" promise until approved.
- Defense brokerage activity and Linaviya.

## 7. Decisions needed from the owner (short list)
1. Primary CTA: "Request a technical meeting" (recommended) or "Plan a technical meeting".
2. "Reply within 2 business days": yes or no.
3. H1 option A, B or C.
4. Catalogue item lines: confirm against the portfolio deck.
5. 81-province sentence: approve wording.
6. Item list: printable page (recommended) or PDF.
7. About values line: drop (recommended) or "Integrity · Clarity · Collaboration".
8. Megger logo: does the signed letter allow logo use.
9. Phone and WhatsApp Business number; second internal mailbox for leads.
10. Lawyer review: KVKK notice, form line, transfers abroad, "scope set in the agreement" line, mandatory company information on the site.
