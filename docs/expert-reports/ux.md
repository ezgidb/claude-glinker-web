# Glinker Group — UX / interaction spec (v1)

Prepared 2026-11-14. Builds on `ia.md`, `content.md`, `cro.md`, `wp.md`. Product facts and banned-claim rules in `content.md` stay binding; this report changes how content is shown, not what is claimed. `NEW:` marks microcopy that does not exist in the other reports and needs the owner's OK.

Two measures are used throughout:
- **At rest** = words a visitor sees without tapping anything (main content only; header, footer, form labels excluded).
- **In DOM** = all words in the page HTML, including collapsed panels (what Google and a no-JS reader get).

Honest limit: verified facts and the mandatory caveats (e.g. "two-gas monitor, does not replace laboratory DGA") cannot be deleted, so the **in-DOM** totals fall only 15–45 %. The gain is **at rest**: 55–80 % less to read.

---

## 1. Diagnosis

Word counts are from the prototype, design notes excluded.

| Page | Now | Target at rest | Target in DOM | Where the text is, and what to cut |
|---|---|---|---|---|
| Home | 181 | **≤ 75** | ≤ 120 | Hero paragraph (33 w) repeats the H1: delete. "Two lines of work" heading + two card paragraphs (54 w): replace with two doors (label + 5-word sub-line). Trust strip `dd` lines (21 w): shorten to ≤ 4 words each. Closing sentence under the last heading: delete, keep heading + button. |
| Online Monitoring hub | 454 | **≤ 110** | ≤ 520 * | Second intro paragraph (70 w): reduce to one 15-word line; full "why continuous monitoring" text goes into a closed `<details>` at the bottom. Master table (≈ 190 w, 5 columns, side-scrolls on mobile): replace with explorer, one asset open (≈ 45 w). Technology link list repeats the table's column 4: keep as 5 icon chips, no sentence. Three sector cards with descriptions (40 w): become preset chips. "Other critical facilities" (45 w): one line, 16 w. CTA sentence: delete. |
| Technology page (5) | 244–323 | **≤ 120** | ≤ 250 (one product) / ≤ 300 (two) | Intro 50 w → one sentence ≤ 25 w. "What it detects" bullets (40–60 w): fault tiles. "Where it applies" bullets (30–45 w): mini chain with highlighted assets, zero sentences. Product paragraph + bullets (60–110 w): spec card, key–value. Standards paragraph (35–45 w): standard-number chips, one line each on tap. Related-technology paragraph (30–40 w): one link. |
| Sector page (3) | 151–168 | **≤ 90** | ≤ 200 | Intro 52–56 w → ≤ 20 w. 4–6 row table with product column: explorer with the sector preset locked; product field hidden (content.md rule: sector pages name no products). |
| Supply & Project Solutions | 360 | **≤ 110** | ≤ 280 | Intro 60 w → ≤ 22 w (keep "It is not a manufacturer"). Six cards with "·" item strings (≈ 110 w, all visible): six icon tiles, items on tap. Define–Build–Run (95 w, three paragraphs): stepper, one step open. "Alternatives across Türkiye" paragraph (30 w): one stat line + link. |
| Knowledge Notes | 152 | **≤ 30 + 22 per card** | — | Intro 17 w → ≤ 10. Each digest card shows three labelled bullets (≈ 55 w): card shows badge, title, the "Who it is for" line; the other two points open on tap. |
| About | 176 | **≤ 80** | ≤ 115 | "Way of working" (40 w) repeats the Supply stepper and the spec-card label: delete. Megger paragraph: one line. Trade Facilitator: two paragraphs become a two-option toggle. |
| Contact | 146 (form labels included) | **≤ 25** + form | — | Intro 30 w → ≤ 12. "Item lists can be sent…" line: move into the note-field hint. Topic `<select>` → three choice buttons. |

\* The hub's DOM grows slightly because every asset panel is in the HTML; that is intended (crawlable, no-JS readable).

Cross-page repetition to remove: the "Sectors: Data Centers · Airports · Distribution Utilities" line on every technology page (the mini chain replaces it); the sentence under every CTA heading; product names repeated in sector tables.

---

## 2. Interaction model

**One paragraph.** Every page opens with one visual selector and one answer already showing: *pick → one compact panel → one link deeper*. Text has three levels only: a label (≤ 4 words), one line (≤ 14 words), and a link to the page where the full fact lives. The same four behaviours are reused everywhere, so the visitor learns the site once: (1) **select-one** (explorer nodes, fault tiles, supply tiles, stepper steps: one item is always selected, selecting another swaps the panel), (2) **preset chips** (sector filter on the explorer), (3) **key–value card** (product specs), (4) **anchor row** (mini-nav). Nothing opens on hover only, nothing overlays the page, nothing moves by itself except one optional sub-second line draw on the explorer. Every block is plain HTML first (list, `dl`, links); the script only collapses and swaps.

**Global rules (apply to every component below)**
- Breakpoint: `< 768px` mobile layout, `≥ 768px` desktop layout. Tap targets ≥ 44 × 44 px.
- Selected state = navy tile + white symbol + 4 px cyan bar. Never colour alone: `aria-expanded` / `aria-pressed` carries it for assistive tech.
- Transition: 160 ms ease-out, `opacity` and ≤ 4 px `translateY` only. Under `prefers-reduced-motion: reduce`: no transition, instant swap.
- No layout shift above the tapped element. Panels reserve `min-height` on desktop.
- No-JS default is **everything open**. The script adds `.js` to the block root; only `.js` CSS collapses anything.
- No strings in JavaScript. Button texts such as "Next asset" sit in the HTML (`<template>` or `data-` attributes on the block root) so a translator edits one place.
- One primary button per page: **Request a technical meeting** (Supply page: **Send your requirement**).

### 2.1 Home

| | |
|---|---|
| Components | Guided entry (two doors, spec 4e) inside the hero; static mini chain as decoration on door 1; trust strip as three fact tiles; CTA band. |
| Mobile first screen | Logo (small, left), eyebrow, H1, **both doors** fully visible (each ≈ 96 px: icon, label, sub-line, arrow). |
| Desktop first screen | Logo left, H1 right, two doors side by side under the H1; the top of the trust strip is visible. |
| Opens on tap | Nothing opens; every target is a link. Door 1 carries four sector chips, so the sector visitor reaches the right page in one tap. |
| Microcopy | Eyebrow: `Trade Facilitator`. Door 1: **Monitor critical assets** / sub-line "Transformers, cables, machines, networks". Chips: `Data Centers` `Airports` `Distribution Utilities` `All assets`. Door 2: **Source electrical materials** / sub-line "From Turkish manufacturers, one contact". Trust tiles: `Megger` "Strategic partner" · `81` "Provinces in supplier network" · `18+` "Years in electrical supply". Band heading: "Start with a technical conversation". Button: `Request a technical meeting`. |
| Text that remains | Eyebrow + its one-line explanation (11 w), H1 (10 w), doors (≈ 25 w), trust (≈ 12 w), band (9 w). **≈ 70 at rest.** |

Door labels are `NEW:`.

### 2.2 Online Monitoring hub

| | |
|---|---|
| Components | Power-chain explorer (section 3) directly under the H1; technology chip row; one closed `<details>`; CTA band. |
| Mobile first screen | H1, one line, four preset chips (2 × 2), top of the vertical chain with **Power transformer** open and its panel readable. |
| Desktop first screen | H1 + line, preset chips, the whole horizontal diagram, and the four-field panel strip for Power transformer under it. |
| Opens on tap | Asset → panel. Preset chip → highlights assets, swaps the risk line, shows `Open sector page`. `Why continuous monitoring?` → the 87-word paragraph from content.md §3.0. |
| Microcopy | Line: "Faults develop over weeks. Continuous monitoring shows the trend while the asset stays in service." Preset group label: `Show for`. Chips: `All` `Data Centers` `Airports` `Distribution Utilities`. Panel field labels: `Main risk` `What is different` `Monitoring` `Product`. Panel buttons: `Next asset`, `Show all assets`. Chip-row label: `Technologies`. Chips: `Partial Discharge` `DGA` `Cable & MV` `Distribution & Power Quality` `Asset Management`. Other sectors line: "Generation, transmission, rail, defence-industry and other critical facilities use the same assets. Contact us." |
| Text that remains | H1, line (15 w), one open panel (≈ 45 w), chips (≈ 20 w), other-sectors line (16 w). **≈ 105 at rest.** |

### 2.3 Technology page template (PD, DGA, Cable & MV, Distribution Transformer & Power Quality, Asset Management)

| | |
|---|---|
| Components, in order | Sticky mini-nav (4f) → fault tiles (4a) → "Where it applies" mini chain (static strip of the explorer symbols, applicable assets in navy, the rest outlined; each navy asset links to the hub at `#px-…`) → spec card(s) (4b) → standard chips → one related-technology link → CTA. |
| Mobile first screen | Breadcrumb, H1, one sentence, mini-nav, first row of fault tiles with the first one revealed. |
| Desktop first screen | Same plus all four fault tiles with their lines visible. |
| Opens on tap | Fault tile → its one line (mobile only; desktop shows all). Standard chip → one line on what the standard covers (`<details>`). Asset in mini chain → hub explorer with that asset open. |
| Microcopy | Mini-nav: `Detects` `Applies` `Product` `Standards` (Asset Management: `Does` `Applies` `Product` `Standards`). Section headings: "What it detects" / "Where it applies" / "Product" / "Standards". Spec card tag: `Per manufacturer data`. Spec card link: `Ask about this product`. Related link: `See also: DGA Monitoring` (page-specific). |
| Text that remains | Intro ≤ 25 w; fault tiles 4 × (label 3 w + line ≤ 14 w); one bold limit line ≤ 16 w (e.g. PD: "A single measurement shows discharge is present. A trend tells you whether to act."; DGA: "A two-gas monitor shows that something is developing. Fault type needs laboratory DGA."); spec card ≤ 60 w per product; standards ≤ 12 w each. **≤ 120 at rest, ≤ 250 / 300 in DOM.** |

### 2.4 Sector page template (Data Centers, Airports, Distribution Utilities)

| | |
|---|---|
| Components | Explorer with locked preset (4g); for Data Centers only, one line linking to the Supply data-center tile; CTA. |
| Mobile first screen | Breadcrumb, H1, one sentence ≤ 20 w, top of the chain with the sector's first asset open. |
| Desktop first screen | H1, sentence, full diagram with the sector's assets in navy, panel strip. |
| Opens on tap | Asset → `Risk here` (sector line) + `Monitoring` (link). No product field. |
| Microcopy | Panel labels: `Risk here` `Monitoring`. Buttons: `Next asset`. Link under the explorer: `See all assets` (to hub). Data Centers extra line: "Racks, PDU, UPS and ATS/STS: see Supply & Project Solutions." |
| Text that remains | Suggested sentences, cut from content.md §4 — DC: "Redundancy hides a slow insulation fault; it does not remove it." Airports: "One substation fault can stop the whole operation, and maintenance windows are short." Utilities: "Where is the fault, which asset is closest to failure, what to maintain first?" **≤ 90 at rest.** |

### 2.5 Supply & Project Solutions

| | |
|---|---|
| Components | Six icon tiles (4d) → Define–Build–Run stepper (4c) → reach line → CTA. |
| Mobile first screen | H1, one sentence, the first four tile rows (all six within 1.3 screens). |
| Desktop first screen | H1, sentence, 3 × 2 tile grid, item strip for tile 1. |
| Opens on tap | Tile → item list. Step → `You bring` / `You get`. |
| Microcopy | Intro: "Electrical materials and project solutions matched with Turkish manufacturers. Glinker Group is not a manufacturer; you deal with one contact." Tile labels: `Earthing & conduit` `Cables & conductors` `MV installations` `Panels & switchgear` `Lighting` `Data center power`. Stepper heading: "How it works". Step buttons: `1 Define` `2 Build` `3 Run`. Panel labels: `You bring` `You get`. `Next step`. Reach line: "**81 provinces** in the supplier network." + link `Ask for an alternative`. Other needs (keep as is): "You can also contact us for needs in engineering and project design, building systems, software and cyber security." Small print (lawyer): "The scope of each engagement is set out in the agreement." Button: `Send your requirement`. |
| Text that remains | **≈ 105 at rest** (intro 22, tile labels 14, one open tile ≈ 20, one open step ≈ 25, reach + other needs ≈ 25). |

### 2.6 Knowledge Notes

| | |
|---|---|
| Components | Filter chips (existing); cards with format badge, title, one line, and a `<details>` for the other two digest points. |
| Mobile first screen | H1, one line, filter chips, first card. |
| Opens on tap | `3-point summary` → "What it says / Why it matters". Source link leaves the site in the same tab. |
| Microcopy | Line: "Our notes, and short summaries of industry sources." Chips: `All` + method tags from content.md §5.1. Card links: `3-point summary`, `Open the source`, `Read the note`. |
| Text that remains | Per card ≤ 22 w at rest: badge, title, "For: maintenance and asset management teams preparing a specification." |

No new component; this is a trim, not a redesign.

### 2.7 About

| | |
|---|---|
| Components | Three fact tiles; two-option toggle for Trade Facilitator. |
| Mobile first screen | H1, one sentence, tile 1 and tile 2. |
| Opens on tap | Toggle `International buyers` / `Turkish manufacturers` swaps one sentence (select-one pattern; both sentences visible without JS). |
| Microcopy | Sentence: "Ankara-based engineering and supply company; solution partner for critical electrical infrastructure." Tiles: `Online Monitoring` "In strategic partnership with Megger" → link · `Supply & Project Solutions` "18+ years in electrical supply" → link · `Trade Facilitator` "Bridging Cultures, Building Trust". Toggle sentences: the two existing ones from the prototype, unchanged. Button: `Request a technical meeting`. |
| Text that remains | **≈ 80 at rest**, ≈ 115 in DOM. |

### 2.8 Contact

| | |
|---|---|
| Components | Topic as three choice buttons above the form (styled radio group; Fluent Forms radio field + CSS); form fields per cro.md §3; contact facts as two lines. |
| Mobile first screen | H1, one line, topic buttons, first two fields. |
| Opens on tap | Nothing. Topic is preselected when the visitor arrives from a page button (existing `data-topic` behaviour). |
| Microcopy | Line: "Tell us your sector and the asset or need." Topic legend: `What is it about?` Options: per cro.md §3.2, each ≤ 4 words. Submit: `Send request`. Facts: "Ankara, Türkiye" · koordinasyon@glinkergroup.com. |
| Text that remains | **≤ 25 at rest** outside the form. |

---

## 3. Power-chain explorer — detailed spec

### 3.1 Structure (one DOM, two layouts)

The block is an ordered list. Each asset is an `<li>` holding a button and its panel. Text lives in HTML; the SVG carries no text.

```html
<section class="px" id="px" data-preset="all" data-next="Next asset" data-all="Show all assets">
  <div class="px-presets" role="group" aria-label="Show for">
    <button type="button" aria-pressed="true"  data-p="all">All</button>
    <button type="button" aria-pressed="false" data-p="dc">Data Centers</button> …
  </div>
  <ol class="px-chain">
    <li class="px-ctx">Grid</li>                                   <!-- context, not interactive -->
    <li class="px-node" id="px-hv" data-in="dc ap du">
      <h3><button type="button" aria-expanded="false" aria-controls="px-hv-p">
        <svg aria-hidden="true" focusable="false"><use href="#sym-hv"/></svg>
        <span>HV cable</span></button></h3>
      <div class="px-panel" id="px-hv-p" role="region" aria-labelledby="…">
        <dl>
          <dt>Main risk</dt>
          <dd class="px-risk">Joint and termination failure.</dd>
          <dd class="px-risk" data-p="dc">Joint or termination failure on the single supply route.</dd> …
          <dt>What is different</dt><dd>…</dd>
          <dt>Monitoring</dt><dd><a href="/en/online-monitoring/cable-mv-monitoring/">Cable &amp; MV Monitoring</a></dd>
          <dt class="px-prod">Product</dt><dd class="px-prod">Synaptec Greenlight®</dd>
        </dl>
      </div>
    </li> …
  </ol>
</section>
```

- **Desktop (≥ 768 px):** `.px-chain` is a CSS grid. Buttons sit in row 1 in chain order, left to right, joined by the trunk line; the Generator / HV motor button hangs below the MV section (row 2); Whole fleet is a full-width band under the chain (row 3) drawn as a bracket spanning all assets. The open panel is placed in the last row, full width, as a **four-column strip** (`Main risk | What is different | Monitoring | Product`), with a small notch under the selected node. `min-height` fixed so swapping does not move the page.
- **Mobile (< 768 px):** the same list is a **vertical rail**: 56 px symbol column on the left with the trunk line running top to bottom, label to the right, chevron at the far right; rows 52 px. Grid at the top, Loads at the bottom (a single-line diagram reads naturally top-down). The panel opens **inline under its row** as a stacked `dl`. Generator / HV motor is an indented row after MV feeder with a short branch line; Whole fleet is the last row, on a soft-grey band.
- **What the illustrator must deliver for this:** each asset as a `<symbol>` on a 48 × 48 grid (2 px stroke, `currentColor`), plus trunk/branch segments. If the artwork arrives as one fixed horizontal SVG instead: use it on desktop as a background with the HTML buttons positioned over the nodes in percentages, and build the mobile rail from the same symbols. Do not shrink a horizontal diagram to phone width, and do not make it side-scroll.

### 3.2 Nodes

| id | Diagram label | Interactive | In presets |
|---|---|---|---|
| — | Grid | no (context) | — |
| `px-hv` | HV cable | yes | DC, Airports, Utilities |
| `px-pt` | Power transformer | yes — **default** | DC, Airports, Utilities |
| `px-mv` | MV overhead feeder | yes | Utilities |
| `px-gm` | Generator / HV motor | yes | DC |
| `px-dt` | Distribution transformer | yes | Airports, Utilities |
| `px-sp` | Supply point / busbar | yes | DC, Airports, Utilities |
| — | Loads | no (context) | — |
| `px-fl` | Whole fleet | yes | DC, Utilities |
| `px-gis` | Gas-insulated switchgear | optional, see Q1 | none |

Grid and Loads have no row in the master table, so they are labels only; making them tappable would need invented content. "Overhead" must stay in the MV label (MS5200 is an overhead-line sensor).

### 3.3 Panel content (master state, preset = All)

Wording from content.md §2.3, shortened; each field ≤ 14 words.

| id | Main risk | What is different | Monitoring (link target) | Product |
|---|---|---|---|---|
| `px-hv` | Joint and termination failure. | The weak points are spread along the route, not in one place. | Current, screen current and temperature sensing at joints and terminations → Cable & MV Monitoring | Synaptec Greenlight® |
| `px-pt` | Insulation breakdown in windings and bushings; developing internal fault. | Long replacement lead time: early warning has the highest value here. | Partial discharge monitoring → Partial Discharge Monitoring · Dissolved gas and moisture monitoring → DGA Monitoring | ICMobserver · InsuLogix® G2 |
| `px-mv` | Line faults, broken conductors, high-impedance faults. | The task is locating a fault on a long line, not assessing insulation. | Line-mounted current and voltage sensors with analytics software → Cable & MV Monitoring | MS5200 with Megger Grid Analytics |
| `px-gm` | Stator winding insulation deterioration. | Some partial discharge is always present, so the trend matters, not the single reading. | Partial discharge monitoring → Partial Discharge Monitoring | ICMobserver |
| `px-dt` | Oil ageing and moisture. | Many low-cost units: one sensor per unit, not a full monitoring system. | Online oil-condition sensing → Distribution Transformer & Power Quality | TrafoStick (A. Eberle) |
| `px-sp` | Voltage dips, harmonics, flicker, unbalance. | A network property measured at a connection point, not a condition of one asset. | Class A power quality measurement → Distribution Transformer & Power Quality | PQI-DA smart (A. Eberle) |
| `px-fl` | Maintenance and investment effort placed on the wrong assets. | Combines data from all assets above; adds no new measurement. | Asset performance management software → Asset Management | IPS®APM |
| `px-gis` (optional) | Internal insulation defects. | Sealed and compact: measured in the UHF range from inside the enclosure. | UHF partial discharge monitoring → Partial Discharge Monitoring | On request |

Above the explorer, once: the one-line shared logic (section 2.2). The panels must not repeat it.

### 3.4 Sector presets

Preset lines replace the `Main risk` text; the label becomes `Risk here`. Lines from content.md §4.

| id | Data Centers | Airports | Distribution Utilities |
|---|---|---|---|
| `px-hv` | Joint or termination failure on the single supply route. | Joint and termination failure on supply routes. | Joint and termination failure. |
| `px-pt` | Insulation fault developing unnoticed under continuous high load. | Internal fault leading to loss of the main supply. | Developing internal fault; long replacement lead time. |
| `px-mv` | — | — | Long fault-location times; broken conductors. |
| `px-gm` | Stator insulation deterioration on machines that rarely run. | — | — |
| `px-dt` | — | Oil ageing and moisture across many units. | Oil ageing and moisture across a large population. |
| `px-sp` | Voltage dips and harmonics from non-linear load. | Voltage dips and harmonics affecting electronic loads. | Supply quality obligations. |
| `px-fl` | No single view of asset condition across sites. | — | Prioritising maintenance and investment. |

Behaviour:
- Tapping a chip sets `aria-pressed`, sets `data-preset` on the root; CSS does the rest (`[data-preset="dc"] .px-node:not([data-in~="dc"])` is dimmed; the matching `dd[data-p]` is shown, the master `dd` hidden).
- **Dimmed** = symbol stroke `#9aa6bd`, label `#6b7688` (still ≥ 4.5:1 on white), no navy fill. Dimmed assets stay tappable and show the master text.
- If the open asset is not in the new preset, selection moves to the first asset of the preset in chain order. Otherwise the open asset stays open.
- With a preset active a link appears next to the chips: `Open sector page`.
- Result is announced through a visually hidden `aria-live="polite"` line: "Data Centers: 5 assets highlighted." (string in a `data-` attribute).
- `Next asset` steps through highlighted assets only, in chain order, and wraps.

### 3.5 Default state

Preset `All`, `px-pt` open. Power transformer is the asset every sector shares and the only one with two technologies, so the first panel already shows the range. On sector pages: the preset is locked and the first highlighted asset in chain order is open.

### 3.6 Motion

- Select: outgoing panel disappears instantly; incoming fades in over 160 ms with 4 px rise. Node fill changes over 160 ms.
- Preset: dim/undim over 160 ms.
- Optional, subject to Q3: **once**, when the block first enters the viewport, the trunk line draws from Grid to Loads in 600 ms (`stroke-dashoffset`), then the default node takes its selected state. Never repeats, never loops.
- `prefers-reduced-motion: reduce`: all of the above off; final state rendered immediately.

### 3.7 Keyboard and ARIA

Pattern: **disclosure buttons with single-open behaviour** (not `tablist`: the mobile layout is an accordion, and one pattern for both layouts is safer than two).
- Each node is a native `<button>` inside an `<h3>`, with `aria-expanded` and `aria-controls`. Tab moves through nodes in chain order; Enter / Space opens. DOM order is button → its panel, so Tab from an open node goes straight into that panel's links, in both layouts.
- Enhancement: Arrow Right/Down and Left/Up move focus between node buttons; Home / End jump to first / last. Arrows do not select.
- The open node cannot be closed by tapping it again (one panel is always open, so the block never looks empty). `Show all assets` opens every panel as a list (useful for comparison and for print); it toggles `aria-pressed` and adds `.px-all`.
- Presets: `role="group"` with `aria-label`, buttons with `aria-pressed`.
- Focus ring: existing 3 px navy outline, 2 px offset; cyan on navy tiles.
- SVG symbols: `aria-hidden="true" focusable="false"`. The accessible name is the HTML label.
- On mobile, after a selection collapses a panel above the tapped row, the script calls `scrollIntoView({block:"nearest"})` on the tapped row so it does not jump off screen. No focus is moved automatically.

### 3.8 Deep-linking limits

- Each node has a real id, so `/en/online-monitoring/#px-dt` works without JS (browser scrolls to the row) and with JS (that asset opens). Technology pages link to the hub this way.
- Selection updates the hash with `history.replaceState` (shareable, but the Back button does not step through assets).
- **Not deep-linkable:** preset state on the hub. The sector page *is* the deep link for a sector. No query parameters (cache and canonical stay clean).
- State is not stored between visits.

### 3.9 Fallback

- **No JS:** the block is a labelled list of seven assets, each with its `dl` open, in chain order, with symbols and trunk line. Preset chips are hidden (`.px:not(.js) .px-presets{display:none}`); sector lines are hidden, master text shows. Content equals the master table in content.md §2.3, so no separate `<table>` is kept (one place to edit).
- **Print:** same as no-JS (all panels open).
- **SVG symbol fails:** label text still names every node.

### 3.10 Delivery

Elementor Free: one HTML widget holds `<style>`, the symbol sprite, the list and the `<script>`. The block appears on four pages per language. Global widgets are Pro, so either (A) paste the block on each page and accept four copies per language, or (B) register one shortcode with the free Code Snippets plugin (`[glinker_power_chain preset="dc"]`) and place a Shortcode widget on each page. **B is recommended**: one source per language, product-name changes made once. Target weight: ≤ 25 KB uncompressed including symbols; no images, no fonts beyond the site's.

---

## 4. Component specs

All are Elementor-Free feasible as one HTML widget each unless noted.

### (a) Fault tiles — "What it detects"

- **Purpose:** replace bullet lists with 3–4 recognisable faults.
- **Anatomy:** `<ul>`; each `<li>` = button (48 px icon + label ≤ 3 words) + one line (≤ 14 words). Below the row: one bold limit line.
- **States:** rest (first tile selected), selected, focus.
- **Desktop:** 4 columns, **all lines visible**, no interaction needed (buttons render as plain headings via CSS).
- **Mobile:** 2 × 2 icon grid; the selected tile's line shows in a strip under the grid; tapping another swaps it. `<li>`s use `display:contents` so the strip can span both columns.
- **A11y:** buttons with `aria-expanded`; lines are in the DOM, hidden with `hidden` only when `.js` is present.
- **Tiles per page** (lines shortened from content.md §3):

| Page | Tiles (label — line) |
|---|---|
| Partial Discharge | `Voids and cracks` — inside solid insulation · `Surface tracking` — on bushings and terminations · `Stator discharges` — slot and end-winding discharges in stator windings · `Rising trend` — changes in magnitude and repetition rate over time |
| DGA | `Hydrogen` — produced by most developing faults: a general early indicator · `Acetylene` — associated with arcing; even small amounts need attention · `Moisture` — reduces dielectric strength and speeds up paper ageing |
| Cable & MV | `Screen current` — abnormal sheath currents at HV joints and terminations · `Overheating` — temperature at HV joints and terminations · `Broken conductor` — on MV overhead feeders, with the faulted section identified · `High-impedance fault` — on MV overhead feeders |
| Distribution Transformer & Power Quality | `Oil strength` — falling dielectric strength of transformer oil · `Moisture` — rising moisture in the oil · `Voltage events` — dips, swells, harmonics, flicker and unbalance, with recorded waveforms |
| Asset Management ("What it does") | Numbered, no icons: `1 Collect` — test and monitoring data in one record per asset · `2 Assess` — a condition indication per asset · `3 Rank` — by condition and importance to the network · `4 Plan` — maintenance and longer-term investment |

Hydrogen and acetylene use set text (`H₂`, `C₂H₂`) in a square instead of an icon. TrafoStick hydrogen is not shown (content.md HOLD).

### (b) Product spec card

- **Purpose:** product facts scannable in five seconds; the "per manufacturer data" label visibly attached to the values.
- **Anatomy:** cyan top rule (existing `.prod`) · product name (h3) · maker line ≤ 12 words · tag `Per manufacturer data` · `dl` of ≤ 5 rows (key ≤ 3 words, value ≤ 12 words) · optional **limit row** on a white inset with a navy left bar · text link `Ask about this product` (to Contact with topic preselected).
- **States:** static. No expand, no tabs.
- **Mobile:** `dt` above `dd` (stacked); desktop: two-column grid, keys 32 % width. Two products on one page: stacked on mobile, side by side on desktop.
- **A11y:** real `dl`; the tag is text, not an image; limit row is normal text, not an alert role.
- **Feasibility:** Free; can even be a Text Editor widget with a `dl` if the owner wants to edit it without touching code.
- **Rows:** from content.md §3 only. Example, InsuLogix® G2 — `Measures`: hydrogen, acetylene, moisture in oil · `Detection limits`: 25 ppm H₂ · 0.5 ppm C₂H₂ · 2 ppm moisture · `Mounting`: single 38 mm (1.5 in) valve · `Weight`: approx. 13.5 kg · `Communication`: Modbus RTU / TCP; DNP3 and IEC 61850 optional · **Limit row:** "Two-gas monitor. Does not replace laboratory DGA; ratio methods do not apply to its readings alone." TrafoStick card: name, maker line, no rows until the datasheet arrives. ICMobserver sensor sentence becomes a row: `Sensors`: defined per installation with the manufacturer.

### (c) Define–Build–Run stepper

- **Purpose:** show the working method as three steps with a clear exchange.
- **Anatomy:** three numbered step buttons joined by a line; one panel with two columns `You bring` | `You get`; `Next step` button (on step 3 it becomes the page CTA link `Send your requirement`).
- **States:** step 1 selected at rest; selected / done (number stays navy, no tick marks: it is an explanation, not progress).
- **Desktop:** steps in a row on the navy band, panel beneath. **Mobile:** vertical; number rail on the left, the open step's panel inline, `You bring` above `You get`.
- **A11y:** same disclosure pattern as the explorer; ordered list semantics (`<ol>`), so the sequence is announced. No-JS: three steps, all open.
- **Content:**

| Step | You bring | You get |
|---|---|---|
| Define | Item list, technical specification, applicable standards, target delivery. | A clear scope and a short list of open questions. |
| Build | `NEW:` Answers to the open questions; your priorities on specification, quality and delivery time. | A comparable proposal from matched manufacturers. The choice stays with you. |
| Run | `NEW:` Your selection and order. | Order, production follow-up, documents, logistics through one contact; a status you can follow. |

### (d) Supply catalogue tiles

- **Purpose:** show scope as six pictures; items on demand.
- **Anatomy:** six tiles (48 px icon + label ≤ 3 words + chevron); panel = items as a wrapped list of short chips (plain `<ul>`, not links).
- **States:** tile 1 selected at rest; selected; focus. Data center tile panel also carries the link `Monitoring for data centers`.
- **Desktop:** 3 × 2 grid; one shared full-width strip under the grid shows the selected tile's items (`li{display:contents}`, panels placed in the last grid row). **Mobile:** six rows (icon left, label, chevron), 56 px each, all six visible on one screen; items open inline under the row.
- **A11y:** disclosure buttons, single-open; item lists are real lists. No-JS: six headings with their lists.
- **Content:** item strings exactly as in the prototype's six cards. `MV installations` has no items yet: see Q4.

### (e) Guided entry on Home

- **Recommendation: two doors, not a three-question selector.** The site has two lines; a wizard would add taps to reach the same two pages, and it needs JS. Two doors with sector chips inside door 1 reach every destination in **one tap**, with no script.
- **Anatomy:** group heading (visually small) `What do you need?` · Door 1 (navy gradient card, power-transformer symbol, label, sub-line, arrow; under a thin rule the four sector chips) · Door 2 (navy gradient card, cable symbol, label, sub-line, arrow). On desktop door 1 also shows the static mini chain (decorative, `aria-hidden`).
- **States:** rest, hover (arrow moves 4 px, 160 ms), focus.
- **Mobile:** doors stacked, door 1 first; chips wrap to two rows.
- **A11y:** the card heading is the link (stretched with `::after` to cover the card); chips are separate links raised above it (`position:relative; z-index:1`) so there are no nested links. Chips ≥ 44 px high.
- **Feasibility:** native Elementor containers + Heading + Icon List; no HTML widget required.
- **Routes:** `Monitor critical assets` → hub · `Data Centers` / `Airports` / `Distribution Utilities` → sector pages · `All assets` → hub `#px` · `Source electrical materials` → Supply.

### (f) Sticky in-page mini-nav (technology pages)

- **Purpose:** let an engineer jump to the spec card without scrolling past explanations.
- **Anatomy:** `<nav aria-label="On this page">` with four anchor links, 44 px high, white bar with bottom rule; current section marked by a 3 px cyan underline and `aria-current="true"`.
- **States:** rest, current, focus. Updated by `IntersectionObserver`; without JS it is a plain anchor row.
- **Mobile:** four one-word labels fit at 360 px; no horizontal scroll. Sticks under the top edge.
- **A11y:** sections get `scroll-margin-top` equal to the bar height + 12 px so headings and focused elements are never hidden under it (WCAG 2.2, 2.4.11). No smooth scrolling under reduced motion.
- **Feasibility — one trap:** Elementor Free has no sticky option, and `position:sticky` inside an HTML widget only sticks within the widget's own wrapper (i.e. not at all). Put the nav in its **own top-level container**, give that container a CSS class (`gl-mininav`), and add `.gl-mininav{position:sticky;top:0;z-index:20}` in Customizer → Additional CSS. If the theme header is ever made sticky, `top` must equal its height.

### (g) Sector page explorer

- Same block as section 3 with `data-preset="dc|ap|du"` and `data-locked`. Locked means: preset chips not rendered; non-sector assets dimmed and **not focusable** (`disabled` buttons), still labelled; `Product` field hidden; `What is different` field hidden; panel shows `Risk here` + `Monitoring` only.
- Desktop panel strip becomes two columns. Mobile unchanged.
- Under the block: `See all assets` → hub.
- The per-asset lines are the table in 3.4. Nothing else is written per sector, so a product change never touches a sector page.

---

## 5. Icon list for the illustrator

Line style, 2 px stroke on a 48 × 48 grid, square caps and joins, `stroke="currentColor"`, no fill, no text inside the artwork. Delivered as `<symbol>` elements in one sprite. 22 icons. Grid (lattice tower) and Loads (building outline) are context marks drawn as part of the chain artwork, not sprite icons.

**Assets (also the explorer nodes)**
1. `hv-cable` — cable drawn along its length with one joint sleeve in the middle.
2. `power-transformer` — tank outline with radiator fins and three bushings on top.
3. `mv-feeder` — single pole with cross-arm and three conductors running off both sides.
4. `generator-motor` — circle with a shaft stub and a sine mark inside.
5. `distribution-transformer` — small tank with two bushings on a pad.
6. `supply-point` — thick horizontal busbar with three vertical tap-offs.
7. `fleet` — three stacked outlined layers (same shape, offset).

**What is detected**
8. `partial-discharge` — two electrodes with a small spark bridging part of the gap.
9. `surface-tracking` — bushing outline with a branching track on its surface.
10. `oil-condition` — oil drop with a level line inside.
11. `moisture` — drop with a wave line through it.
12. `overheating` — thermometer beside a cable joint.
13. `screen-current` — cable ring in cross-section with a curved arrow around the screen.
14. `broken-conductor` — overhead line between two poles with a gap and a hanging end.
15. `waveform` — sine wave with one sagging, distorted cycle.
16. `trend` — rising line chart crossing a horizontal dashed limit.

**Supply catalogue**
17. `earthing` — earth symbol (three shortening bars) under a rod.
18. `cable-reel` — cable drum, side view, with a loose end.
19. `mv-cell` — switchgear cubicle front with a window and handle.
20. `panel` — cabinet with rows of breakers.
21. `luminaire` — linear ceiling fitting with three short rays below.
22. `rack-ups` — rack frame with a battery mark.

Reuse, so no further icons are needed: PD tile "Stator discharges" uses `generator-motor`; Cable & MV tile "High-impedance fault" uses `mv-feeder`; Home door 1 uses `power-transformer`, door 2 uses `cable-reel`; hydrogen and acetylene tiles use set text; Asset Management tiles and stepper steps use numerals.

---

## 6. What not to do

- No scroll-jacking or pinned scrollytelling for the power chain; the diagram responds to taps, the page scrolls normally.
- No hover-only hotspots or tooltips: they do not exist on phones and fail keyboard users.
- No pulsing hotspot dots or looping "live" line animation on the diagram; it reads as decoration and is the "crude" movement the owner wants to avoid.
- No modal, drawer or bottom sheet for asset panels: it breaks the no-pop-up rule and needs focus trapping.
- No animation or UI libraries (GSAP, Lottie, Swiper, AOS) and no Elementor entrance animations per widget; every block stays vanilla and under 25 KB.
- No bento grid with mixed tile sizes: with no photos and equal-weight content it only creates a false hierarchy. Equal tiles.
- No side-scrolling strips on mobile (tabs, diagram, tables): hidden items are unread items.
- No chatbot, quiz or multi-step wizard as the entry; two doors are faster.

---

## 7. Open questions for the owner

1. **GIS on the diagram.** A: leave it out until the product scope is confirmed (recommended). B: show a GIS node with "On request" as product.
2. **Product names on sector pages.** A: hidden; sector pages show risk + technology only, as content.md rules (recommended). B: shown, as in the current prototype.
3. **One attention movement.** A: the chain line draws itself once, in about half a second, when the diagram first appears (recommended). B: no movement at all beyond tap feedback.
4. **"MV installations" tile, which has no item list yet.** A: hide the tile until the items arrive (recommended; five tiles). B: show it with the single line "Scope on request".
