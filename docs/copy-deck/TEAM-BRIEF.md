# Glinker Group website — team brief (read fully before working)

## The assignment
The owner of Glinker Group (Ankara, Türkiye) asked for a brand-new website, built with complete creative freedom. From everything they gave us before, ONLY THE CONTENT (facts, copy) carries over, and we may expand it. All earlier design, layout, IA and "owner decision" constraints are void. They want to be surprised by the best we can make. Aim for an award-level, memorable, crafted site — not a template.

## Who Glinker Group is (facts — the only things you may state as fact)
- Ankara-based engineering and supply company; solution partner for critical electrical infrastructure.
- Two business lines:
  1. **Online Monitoring** — continuous condition monitoring of power assets, provided in Türkiye as a strategic partner of **Megger**.
  2. **Supply & Project Solutions** — electrical materials and project solutions matched with Turkish manufacturers. Glinker is NOT a manufacturer; the client deals with one contact. Method: Define → Build → Run.
- Identity label: **Trade Facilitator** — one point of access between international buyers and Turkish manufacturers. Slogan: **"Bridging Cultures, Building Trust."**
- Numbers: **81 provinces** in the supplier network; **18+ years** in electrical supply.
- Contact: koordinasyon@glinkergroup.com · Ankara, Türkiye. No phone number, no street address, no social links.
- Full source content:
  - `/home/user/claude-glinker-web/docs/expert-reports/content.md` — verified product facts, master asset table, page copy, sector tables, knowledge notes. Its accuracy caveats are BINDING (see below). Ignore its URL structure and its NOTE/editor lines as layout rules.
  - `<SCRATCH>/prototype-text.txt` — plain text of the old prototype: use for Supply scope item lists, Define/Build/Run, About, Contact copy. Ignore its structure.
  (`<SCRATCH>` = `/tmp/claude-0/-home-user-claude-glinker-web/1ad393a9-55d3-5793-a53a-0a3d0523cf9a/scratchpad`)

## Truthfulness rules (non-negotiable)
- Never invent clients, references, case studies, testimonials, certifications, awards, team members, project counts, phone numbers, addresses, prices or statistics. No logos of other companies (Megger etc.) — names in text only.
- Product facts only as in content.md section 1/3, "per manufacturer data". Key caveats: InsuLogix G2 is a two-gas (H₂, C₂H₂) + moisture monitor, NOT full DGA / fault-type diagnosis. Greenlight is HV cable (Synaptec, offered by Megger under a strategic alliance), not PD. MS5200 = MV overhead-line sensor; Megger Grid Analytics (MGA) = its software. ICMobserver is not for GIS (GIS row product = "On request"). IPS®APM is software from IPS-ENERGY offered by Megger. A. Eberle (TrafoStick, PQI-DA smart) is named by brand only — do not claim a Megger–A. Eberle relationship. Don't publish S-3RD values (ICMobserver channel count/bandwidth, MS5200 voltage range, TrafoStick measuring ranges). Don't mention the ESCO transaction.
- Expanding content is welcome when it is general engineering explanation (how PD works, why trends matter, what a dip is), narrative, structure, microcopy, FAQs — not new company or product claims.
- Illustrative charts/animations are fine but must read as illustrations (label "Illustrative"), never as real measured data from a customer.

## Creative direction (lead's decision — elaborate it, don't replace it)
**Idea: "Invisible infrastructure, made visible" + "the line that links".**
Electrical infrastructure is only noticed when it fails; faults grow for weeks or months out of sight. Glinker makes the invisible visible (monitoring) and links the parties (G-linker: buyer ↔ manufacturer, asset ↔ decision). So the site's signature devices are:
1. **The signal** — a living measurement trace (trend line / PD pulses / waveform) as the hero and recurring motif. A trend quietly creeping toward an alarm threshold says everything.
2. **The line** — one continuous hairline that travels through pages, connecting sections; it becomes the power chain (grid → HV cable → power transformer → generator → MV feeder → distribution transformer → busbar → whole fleet) on monitoring pages and the route between buyer and manufacturer on supply/trade pages.
3. **The datasheet** — engineering-document craft: hairline rules, tick marks, mono coordinate labels, section indices (`01 —`), big confident numerals, measured whitespace. Editorial, calm, precise. Feels like a beautifully typeset instrument manual, not a SaaS landing page.

**Look**
- Light, warm "paper" base with deep ink; a few full-bleed dark "instrument" sections (hero, interactive diagram, CTA) where traces glow.
- Tokens (CSS custom properties, defined once in `site.css`):
  - `--ink:#0B1220` `--ink-2:#1B2536` `--paper:#F4F1EA` `--paper-2:#E9E5DA` `--white:#FFFDF8`
  - `--signal:#FF4D1F` (vermilion: alarm, action, the one loud colour — use sparingly)
  - `--trace:#2FE0C2` (phosphor teal: healthy trace, only on dark)
  - `--amber:#FFB020` (warning level in diagrams only)
  - `--rule: color-mix(in srgb, var(--ink) 16%, transparent)`; muted text `color-mix(in srgb, var(--ink) 62%, transparent)`
  - Ensure WCAG AA contrast for all text (signal orange on paper is for large text/graphics/buttons with ink or white text checked for contrast — verify).
- Type: display **Archivo** (variable, use wider widths/semibold, tight tracking, very large), text **IBM Plex Sans**, data/labels **IBM Plex Mono** (uppercase, tracked, small). All must render Turkish glyphs (İ ı ğ ş ç ö ü). Self-host woff2 in `assets/fonts/` if you can download them (fonts.googleapis.com / fonts.gstatic.com reachable through the proxy); otherwise `<link>` Google Fonts. Always provide solid system fallbacks.
- No stock photos, no AI-photo look, no external images. Every visual is code: SVG, canvas, CSS. No emoji. No gradients-as-decoration blobs, no glassmorphism clichés, no generic 3-card icon grids where something more specific can be designed.
- Motion: meaningful and restrained (scroll-drawn line, traces that live, reveal-on-scroll, hover micro-interactions, number tick-up). Everything respects `prefers-reduced-motion`. Site must be fully usable without JS (content in HTML; JS enhances).
- Logo: we don't have the real file. Use a typeset wordmark "Glinker Group" with a small original link/line glyph (inline SVG) — simple and replaceable.

## Technical architecture (fixed so the team can work in parallel)
- Everything lives in `/home/user/claude-glinker-web/site/`. Don't touch `docs/` or `prototype/`.
- Static site, zero runtime dependencies, no frameworks, no CDNs (except Google Fonts if not self-hosted). Vanilla HTML/CSS/JS.
- `site/build.py` (Python 3 stdlib only) renders `site/src/pages/<lang>/<slug>.html` (page fragments with a small front-matter block: title, description, slug, optional body class / nav section) into `site/dist/` using `site/src/layout.html` + partials (header, footer). Copies `site/src/assets/` → `site/dist/assets/`.
- Output is FLAT and uses ONLY RELATIVE URLs so it works from `file://`, any subfolder host, and GitHub Pages: English at `dist/<slug>.html`, Turkish at `dist/tr/<slug>.html`. Build provides a `{{root}}` prefix (`""` or `"../"`) for assets/links. Language switcher links to the same slug in the other language (only shown/active if that page exists).
- Pages / slugs (same slugs in both languages):
  `index`, `monitoring` (hub), `partial-discharge`, `dga`, `cable-mv`, `distribution-power-quality`, `asset-management`, `data-centers`, `airports`, `distribution-utilities`, `supply`, `knowledge`, `note-invisible-infrastructure`, `note-pd-and-dga`, `note-data-center-power-chain`, `about`, `contact`, `privacy`.
- Assets: `src/assets/css/site.css` (design system + components), `src/assets/js/site.js` (core behaviours), `src/assets/js/viz/*.js` (visual modules, each self-initialising on `[data-viz="name"]` elements, no globals needed, safe if element absent), `src/assets/img/*.svg`, `src/assets/fonts/`.
- Contact form has no backend: on submit, compose a `mailto:koordinasyon@glinkergroup.com` with the fields (and show a clear confirmation state). Topic preselect via `?topic=monitoring|supply|sourcing|other`.
- Quality bar: semantic HTML, one h1 per page, keyboard accessible, visible focus, alt/aria for visuals, responsive from 360px to 1920px, no horizontal scroll, good meta/OG tags, `lang` attribute, fast (no heavy libs).
- Verify your own work visually: build, then screenshot with Playwright (`node`, `require('playwright')`, `chromium.launch()` — already installed, do NOT install anything) at 1440×900 and 390×844, full page, and LOOK at the screenshots (Read the PNG) and fix what is weak. Save screenshots in `<SCRATCH>/shots/`. Scripts you write for testing go in `<SCRATCH>`, not in the repo.
- Do NOT git commit or push; the lead does that. Don't create planning/analysis documents in the repo.
- Final report back to the lead: concise — what you built, file paths, anything unfinished or uncertain.
