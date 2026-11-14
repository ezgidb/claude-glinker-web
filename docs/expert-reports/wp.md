# glinkergroup.com — WordPress / Elementor delivery plan

Date: 2026-11-14. Status legend used below: **[TESTED]** = I ran it in this container; **[SOURCE]** = read from Elementor's source code (tag v4.0.8); **[WEB]** = from a web search result (URL given, page itself not opened — most vendor sites are blocked from this session); **[EXPERIENCE]** = general knowledge, not re-verified today.

---

## 1. Live-site inspection — BLOCKED

**The network blocks the site.** `curl https://www.glinkergroup.com/` returns `CONNECT tunnel failed, response 403` from the session's egress proxy, and WebFetch returns `ENOTFOUND` (host not in the session's allowed domains). No login or write request was attempted. Nothing below about the live site is verified: theme, Elementor version, Pro presence, form plugin, SEO plugin, cache, containers-vs-sections, colours/fonts, logo URL and page list are all **unknown**. The expected palette (#1a315e, #2fc1ff, #585858, Jost + Roboto) is the brief's assumption, not a finding.

To get this from a session, `www.glinkergroup.com` must be added to the session's allowed network hosts. Otherwise the owner can answer everything in ~5 minutes:

| Question | Where to look in wp-admin | What to send back |
|---|---|---|
| Elementor Free or Pro? | **Plugins > Installed Plugins** — is there a row "Elementor Pro"? Also: is there a **Templates > Theme Builder** menu that opens without an "Upgrade" screen? | Yes/No + version numbers of "Elementor" and "Elementor Pro" |
| Everything at once (best) | **Elementor > System Info** > button **Download System Info** | The .txt file (contains theme, WP/PHP version, all plugins, experiments; no passwords) |
| Active theme | **Appearance > Themes** (the one marked "Active") | Name |
| Containers or old sections? | **Elementor > Settings > Features** — "Container" (Flexbox Container) Active/Inactive. (In Elementor 4.x the Settings location may read **Elementor > Editor > Settings**.) | Active/Inactive |
| Atomic / V4 editor on? | Same Features/Settings page: "Atomic Editor" / "Atomic elements" | Active/Inactive |
| Global colours & fonts | Open any page with **Edit with Elementor** > top-left menu > **Site Settings > Global Colors / Global Fonts** | Screenshot |
| Form plugin | **Plugins** list: WPForms, Contact Form 7, Fluent Forms, Hostinger Reach, MetForm, or none (= Elementor Pro Form) | Name |
| SEO plugin | **Plugins** list: Yoast SEO / Rank Math / All in One SEO | Name |
| Cache | **Plugins** list: "LiteSpeed Cache" (Hostinger preinstalls it), plus **hPanel > Websites > Dashboard > Performance** | Name |
| Pages | **Pages > All Pages**; or open `https://www.glinkergroup.com/wp-sitemap.xml` (or `/sitemap_index.xml`) in the phone browser | Screenshot / list |
| Logo | **Media > Library** > click logo > "Copy URL to clipboard" | URL |
| Header/footer built how? | **Templates > Theme Builder** (Pro) or **Appearance > Menus / Customize** (theme) or a plugin such as "Header Footer Elementor / UAE" | Which one exists |
| Hosting plan | **hPanel > Websites** — plan name under the domain; and whether **WordPress > Staging** shows a "Create staging" button | Plan name |

---

## 2. Research (2026 facts)

### 2.1 Elementor versions today
- Elementor 4.x is current. New installs start with Atomic features (Atomic Elements, Variables, Classes, Components) on by default; existing sites are not switched automatically, and legacy widgets and Atomic elements can be mixed on one page. [WEB] https://elementor.com/products/website-builder/v4-faq/ , https://developers.elementor.com/elementor-editor-4-0-developers-update/ , https://elementor.com/blog/editor-4-beta/
- Consequence: target the **classic widget + Flexbox Container** format. It works in 3.x and 4.x. The Atomic (`e-heading`, `e-flexbox`, `e-div-block`) format depends on global-class IDs and is far too brittle to hand-write.
- In source v4.0.8 the `container` experiment is "stable" with default *inactive for existing installs / active for new installs* [SOURCE `core/experiments/manager.php`]. On my fresh test install it was **active** [TESTED]. If the live site is an old sections-based build, Container may be off — it must be checked (table above) and, if off, switched on **on staging first**.

### 2.2 Template JSON import/export
- UI path: **Templates > Saved Templates > Import Templates** (button at top) > choose `.json` or `.zip` of several JSON files > **Import Now**. Works in Free. [WEB] https://kinsta.com/blog/elementor-import-template/ , https://wpcrafter.com/?p=24062 , https://theplusaddons.com/blog/how-to-use-elementor-templates/ ; zip-of-JSON support confirmed in [SOURCE `includes/template-library/sources/local.php`].
- Then on a page: **Edit with Elementor > folder icon ("Add Template") > My Templates > Insert**. The dialog asks whether to also import the template's document settings — answer **Yes** (applies `page_settings`, e.g. hide title).
- Import regenerates every element `id` [TESTED] — so never rely on Elementor's auto classes like `.elementor-element-a1b2c3d` in CSS; use `_css_classes` / `css_classes` or `_element_id` instead.
- If the server rejects JSON upload: enable **Elementor > Settings > Advanced > Enable Unfiltered File Uploads** only if SVG is needed; JSON itself is normally accepted. A security plugin/WAF may block it; workaround is to import each JSON separately rather than a zip.

### 2.3 Website Kit ("Website Templates") import/export
- Path: **Elementor > Tools > Import/Export Kit** (newer UI: **Elementor > Editor > Home / Tools > Website Templates** tab > Export / Import). [WEB] https://elementor.com/help/import-and-export-elementor-website-templates/ , https://elementor.com/help/import-kit , https://elementor.com/help/export-kit
- A kit can carry Content (pages), Site Settings (global colours/fonts/theme style), Templates, and a plugin list. [WEB] same URLs.
- Free vs Pro: Elementor's academy says the feature is in Free and Pro; one third-party says Free cannot export. [WEB] https://elementor.com/academy/how-to-import-and-export-elementor-websites/ (conflict noted). What I can confirm: the import/export module and `wp elementor kit import|export|revert` ship in the **free** plugin [SOURCE `app/modules/import-export*`], and a kit **import worked on Free** [TESTED]. Theme-Builder templates inside a kit are only applied when Pro is present [SOURCE `has_pro()` check].
- **Caveat that matters:** importing a kit with site settings creates a new kit and makes it active — it replaces the site's current global colours/fonts. There is a "Revert" (`wp elementor kit revert`, and a button under Tools), but do this on staging only.

### 2.4 Exact JSON document structure (classic, container-based)
Verified by importing and rendering a hand-written file [TESTED] and from [SOURCE `includes/template-library/sources/base.php`, `local.php`, `includes/db.php`]:

```json
{
  "version": "0.4",
  "title": "GL – Home (TR)",
  "type": "page",
  "page_settings": { "hide_title": "yes" },
  "content": [
    {
      "id": "a1b2c3d", "elType": "container", "isInner": false,
      "settings": {
        "content_width": "boxed",
        "flex_direction": "row", "flex_direction_mobile": "column",
        "flex_gap": {"unit":"px","size":32,"column":"32","row":"32","isLinked":true},
        "background_background": "gradient",
        "background_color": "#1a315e", "background_color_b": "#0e1c38",
        "background_gradient_angle": {"unit":"deg","size":135},
        "padding": {"unit":"px","top":"64","right":"24","bottom":"64","left":"24","isLinked":false},
        "css_classes": "gl-hero"
      },
      "elements": [
        { "id": "b1b2c3d", "elType": "container", "isInner": true,
          "settings": {"content_width":"full","width":{"unit":"%","size":50},"width_mobile":{"unit":"%","size":100}},
          "elements": [
            { "id": "c1b2c3d", "elType": "widget", "widgetType": "heading",
              "settings": {"title":"…","header_size":"h1","title_color":"#ffffff",
                           "__globals__":{"typography_typography":"globals/typography?id=primary"}},
              "elements": [] }
          ] }
      ]
    }
  ]
}
```

- `version` = `"0.4"` (`DB::DB_VERSION`), `type` = `page` (or `section`/`container` for partial templates; `header`/`footer` need Pro). Importer hard requirements are only: valid JSON, `content` is an array. Unknown setting keys are silently ignored, unknown `widgetType` is dropped — so a typo fails *silently*, which is why testing matters.
- `id`: 7–8 hex chars, unique per file (regenerated on import anyway).
- Globals: `"__globals__": {"title_color": "globals/colors?id=primary"}`; system IDs that always exist are `primary`, `secondary`, `text`, `accent` (colours and typography). [SOURCE `core/kits/documents/tabs/global-colors.php`]
- Responsive suffixes: `_tablet`, `_mobile` on the same key.
- Control names [SOURCE `includes/widgets/*.php`, `includes/elements/container.php`]:

| Element | Key settings |
|---|---|
| container | `content_width` (boxed/full), `boxed_width`, `width`, `min_height`, `flex_direction`, `flex_justify_content`, `flex_align_items`, `flex_gap`, `flex_wrap`, `html_tag`, `background_*`, `border_*`, `border_radius`, `box_shadow_*`, `padding`, `margin`, `css_classes`, `_element_id`; grid variant: `container_type: "grid"`, `grid_columns_grid`, `grid_rows_grid`, `grid_gaps` |
| heading | `title`, `link`, `header_size` (h1–h6, div, span, p), `align`, `title_color`, `typography_*` |
| text-editor | `editor` (HTML string), `align`, `text_color`, `typography_*` |
| button | `text`, `link` {url,is_external,nofollow}, `size`, `selected_icon`, `align`, `button_text_color`, `background_color`, `hover_color`, `border_radius`, `text_padding`, `button_css_id` |
| icon-box | `selected_icon` {value:"fas fa-check", library:"fa-solid"}, `title_text`, `description_text`, `link`, `title_size`, `position`, `primary_color`, `title_color`, `description_color`, `icon_size` |
| counter | `starting_number`, `ending_number`, `prefix`, `suffix`, `duration`, `title`, `number_color`, `title_color` |
| icon-list | `icon_list` [{`text`, `selected_icon`, `link`, `_id`}], `view` (traditional/inline), `space_between`, `icon_color`, `text_color` |
| image | `image` {url, id}, `image_size`, `link_to`, `link`, `align`, `width`, `caption` |
| html | `html` |
| divider / spacer / menu-anchor / shortcode | `style`,`weight`,`color` / `space` / `anchor` / `shortcode` |

- Images: `"image": {"url": "https://…", "id": ""}`. On import Elementor tries to sideload remote image URLs into the Media Library; if the URL is unreachable the image is left as an external URL. Safest: owner uploads logo/images first and replaces them in the editor, or reference URLs already on her own domain.
- **Tables:** no table widget in Free or Pro core ("Table" exists only in third-party add-ons). Alternatives: HTML widget with a `<table>`; Text Editor widget containing a table (owner can edit cell text in the visual editor — preferable); or a core WordPress Table block inside a non-Elementor region.
- **Nested Tabs / Nested Accordion:** in the free plugin, `nested-elements` experiment is stable and default active; requires Container to be active [SOURCE `modules/nested-tabs`, `modules/nested-elements`]. Hand-writing their JSON is riskier (child containers must match the items repeater count) — avoid or test carefully.

### 2.5 Polylang (free) + Elementor
- Polylang free handles pages, menus, per-language URLs and outputs hreflang tags automatically for translated content; x-default only on the homepage. [WEB] https://polylang.pro/hreflang-tag-attributes-and-polylang-everything-you-need-to-know/
- URL setup: **Languages > Settings > URL modifications** > "The language is set from the directory name in pretty permalinks" (default with pretty permalinks). To get **both** `/tr/` and `/en/`, *untick* "Hide URL language information for default language"; with it ticked the default language stays at the root (existing URLs unchanged). [WEB] https://polylang.pro/doc/url-modifications/ . Also needs **Settings > Permalinks** = "Post name".
- Decision to take: default language at root (zero redirect work, keeps existing indexed URLs) vs. both prefixed (cleaner, but every existing URL changes → needs 301s, and the bare `/` redirects to the default language). **Recommend: default language at root unless the owner specifically wants `/tr/`.**
- Elementor pages are translated by creating a separate page per language (the "+" in the Languages column of **Pages**) and inserting the other-language template into it. Polylang does not copy Elementor content reliably unless you duplicate; with separate TR and EN JSON templates this is a non-issue. [WEB] https://polylang.pro/how-to-translate-elementor-with-polylang/
- Connector plugin: **not strictly required** for per-language pages. It is needed for (a) a language-switcher *widget* inside Elementor and (b) per-language Theme Builder templates (Pro). Options: "Connect Polylang for Elementor" (works with free Polylang; third-party listing shows tested only to WP 6.8.3 — maintenance uncertain) or "Language Switcher for Elementor & Polylang" (listing shows tested with Elementor 4.2.1, Aug 2026). [WEB] https://wordpress.org/plugins/connect-polylang-elementor/ , https://docs.coolplugins.net/doc/connect-polylang-for-elementor.md
- No-connector alternative [EXPERIENCE]: Polylang adds a "Language switcher" item to **Appearance > Menus**, so a theme-rendered header menu gets the switcher for free. This is the main reason to prefer a theme header over an Elementor-built header on Free.
- Polylang free has no slug translation for the same slug in two languages (e.g. `/contact/` in both) — a Pro feature; use distinct slugs (`/iletisim/`, `/en/contact/`). [EXPERIENCE]

### 2.6 Hostinger staging
- Path: **hPanel > Websites > (site) Dashboard > WordPress > Staging > Create staging**; give a subdomain name; creation can take up to ~15 min. [WEB] https://www.hostinger.com/support/5720286-how-to-create-a-wordpress-staging-environment/ , https://docs.hostinger.com/wordpress/staging , https://www.hostinger.com/tutorials/wordpress-staging
- Plans: Business web hosting and above (Cloud, Agency); entry plans (Single/Premium) show an upgrade prompt. Sources differ slightly — confirm in hPanel. [WEB] same.
- Publish: three-dots menu on the staging row > **Publish** > confirm. **This overwrites the live site's files and database with staging**; anything changed on live after staging was created is lost. Make a backup first (**hPanel > Files > Backups**). A backup before publish is reportedly automatic, but do not rely on it. [WEB] same.
- Caveats: no multisite; external nameservers need a manual A record for the staging subdomain; staging for sub-domains not supported. [WEB] same. Also [EXPERIENCE]: after publish, purge LiteSpeed cache and run **Elementor > Tools > Regenerate Files & Data**, and check **Tools > Replace URL** is not needed (Hostinger rewrites the domain; verify no `staging.` URLs remain in page source). Keep staging hidden from search (**Settings > Reading > Discourage search engines**) and make sure that box is **unticked** on live after publishing — publishing copies the database, including that setting.

### 2.7 Forms if Elementor Free only
- Elementor's Form widget is Pro-only (and the new Atomic Form is Pro too). [WEB] https://elementor.com/blog/editor-4-beta/
- **Recommend Fluent Forms (free):** free version lists a "GDPR Agreement" field and "Terms & Conditions" field, has an Elementor widget, stores entries in wp-admin (useful evidence for KVKK). [WEB] https://wordpress.org/plugins/fluentform/ , https://docs.fluentforms.com/gdpr-agreement-field
- KVKK: use a **required, unticked** checkbox with text such as "KVKK Aydınlatma Metni'ni okudum…" linking to the disclosure page; keep the marketing-consent (if any) as a *separate optional* checkbox. A lawyer should confirm wording — KVKK distinguishes informing (aydınlatma) from explicit consent (açık rıza), and bundling them is a known compliance mistake. [EXPERIENCE]
- Alternatives: WPForms Lite (no entry storage in Lite — email only; GDPR checkbox availability in Lite not verified), Contact Form 7 (acceptance checkbox built in, but shortcode-syntax editing is hard for a non-technical owner), Hostinger Reach / bundled Hostinger form tools (not verified).
- SMTP on Hostinger: create a mailbox at **hPanel > Emails**, then in an SMTP plugin (FluentSMTP pairs with Fluent Forms; or WP Mail SMTP) use host `smtp.hostinger.com`, port **465 SSL** (fallback 587 STARTTLS), username = full mailbox address, From address = same mailbox on the site's own domain (never the visitor's address — use Reply-To for that). Check SPF/DKIM in **hPanel > Emails > DNS settings**. Send a test email before go-live. [WEB] https://www.hostinger.com/tutorials/wordpress-not-sending-email

### 2.8 SEO plugin with Polylang
- Keep whatever SEO plugin is already installed (unknown — see §1); never run two.
- If none: **Rank Math (free)** — per-page title/description, and a free Redirections module + 404 monitor (must be switched on under **Rank Math > Dashboard > Modules**). Yoast's redirect manager is Premium-only. [WEB] https://pressable.com/blog/rank-math-vs-yoast/ , https://savvy.co.il/en/blog/wordpress-seo/yoast-vs-rank-math/
- hreflang: leave it to Polylang (it prints `<link rel="alternate" hreflang>` itself); do not enable a second hreflang source. Both Yoast and Rank Math are widely used with Polylang, but I could not retrieve a 2026 compatibility statement — **verify on staging** by viewing page source for exactly one hreflang set and correct per-language sitemaps. [EXPERIENCE + unverified]

### 2.9 Redirects from old single-page anchors
- `https://site/#services` cannot be redirected by the server: browsers never send the `#fragment`. [EXPERIENCE — fundamental HTTP behaviour]
- Options: (1) keep the same anchor IDs on the new homepage (Menu Anchor widget or container `_element_id`) so old links still land sensibly; (2) a ~10-line script on the homepage that maps `location.hash` to new URLs (`#contact` → `/iletisim/`), delivered in an HTML widget; (3) do nothing — fragments carry no SEO value. Recommend (1) + (2) for the 4–5 known anchors.
- Real URL changes (old pages removed/renamed) → 301 in Rank Math Redirections, or the free "Redirection" plugin.

---

## 3. Recommended delivery approach

### Recommendation: **(A) hand-written Elementor JSON page templates**, restricted to a small tested widget set, one JSON per page per language, plus a tiny optional kit zip for global colours/fonts — every file import-tested in a local WordPress before hand-off.

| Criterion | A: JSON page templates | B: Website Kit zip | C: Gutenberg block markup | D: child theme / plugin with PHP templates | E: WXR import |
|---|---|---|---|---|---|
| Robustness of hand-made files | Medium → **high once tested**; importer is lenient but fails silently on wrong keys | Lower: manifest + per-post JSON + taxonomies + WXR inside the zip; many more ways to be subtly wrong; replaces global site settings | High (HTML-ish, validated by editor; invalid blocks show a "recover" prompt) | High technically | Low: Elementor data lives in slashed JSON post-meta; classic WXR corruption risk |
| Owner edits text later | **Yes**, in the editor she already uses | Yes | Yes, but in a different editor than the rest of her site; styling via custom CSS she cannot touch | **No** — text in PHP files | Yes |
| Free vs Pro dependence | None for pages; header/footer need a non-Pro route | Same; TB templates need Pro | None | None | None |
| Speed | Fine with containers + few widgets; LiteSpeed caches output | Same | **Fastest** (no Elementor CSS/JS) | Fastest | Same as A |
| Bilingual readiness | One page + one template per language, linked in Polylang | Kit import does not set Polylang language/links → manual anyway | Good | Needs string translation code | WXR can carry Polylang terms but fragile |
| Fits "no password sharing, phone/laptop" | **Yes**: upload JSON in wp-admin | Yes, one upload, but all-or-nothing | Copy-pasting long markup on a phone is error-prone | Needs theme zip upload; scary for owner | Needs WordPress Importer plugin |

Why not the others, briefly:
- **B** is attractive ("one upload") but the content part is the most intricate format to hand-generate, it overrides her current global styles, and it does not solve Polylang linking. I do use a *minimal* kit (manifest + site-settings only) as an optional convenience — that part is small and was tested.
- **C** is the honest runner-up and wins on speed and file robustness. It loses because the owner already lives in Elementor, mixing editors confuses non-technical users, and the dark gradient cards / stat strip would depend on custom CSS classes she cannot adjust. If it turns out the site has *no* working Elementor (or she is willing to leave it), C becomes the better choice.
- **D** fails the "owner can edit text" requirement.
- **E** is the least safe to hand-generate.

### Honesty about fragility of hand-written Elementor JSON
It is fragile in specific, known ways:
1. Wrong control name or value shape → silently ignored (looks unstyled, no error).
2. Wrong `widgetType` or a Pro widget on a Free site → widget dropped / "widget not found".
3. Containers on a site with Container inactive → layout elements not rendered correctly.
4. Element IDs change on import → any CSS keyed to IDs breaks.
5. Image sideloading can fail → broken or hot-linked images.
6. Elementor version drift (3.x vs 4.x defaults, Atomic on/off).

What makes it safe:
- Widget whitelist only: `container`, `heading`, `text-editor`, `button`, `image`, `icon-box`, `icon-list`, `counter`, `divider`, `spacer`, `html`, `shortcode`, `menu-anchor`. No nested tabs/accordion, no Pro widgets, no Atomic elements, no third-party add-ons.
- Containers only (no legacy section/column), flex direction with `_mobile: column` for stacking.
- Colours/typography via `__globals__` pointing at the four system IDs (`primary`, `secondary`, `text`, `accent`) so she can re-theme in one place; the few non-global values (gradient stops, white-on-dark) inline.
- Custom CSS kept minimal and delivered either in **Appearance > Customize > Additional CSS** (works on Free) or one HTML widget; selectors use `css_classes`, never element IDs. (Per-element "Custom CSS" is Pro.)
- Generate JSON with a script from one content source rather than by hand, so structure is uniform.
- **Round-trip test**: import into local WP+Elementor, render, compare element/widget counts with the source, then *re-export from Elementor* and ship the re-exported file — that file is by definition in Elementor's own canonical form.
- Deliver on staging first; never import directly on live.

### Local test feasibility in this container — **feasible, done as a smoke test**
- Available: `php` 8.3.6 CLI (with `sqlite3`, `pdo_sqlite`, `mysqli`, `zip`, `dom`, `gd`, `mbstring`, `curl`), `composer`, `node` 22, `python3`. `docker` binary exists but **no daemon** (no socket). **No `mysql`/`mariadb`, no `wp`** preinstalled.
- Blocked (proxy 403): `wordpress.org`, `downloads.wordpress.org`, `api.wordpress.org`, `playground.wordpress.net`, GitHub zip archives and release assets, `elementor.com`, `polylang.pro`, `hostinger.com`.
- Reachable: **`git clone` from github.com**, `raw.githubusercontent.com`, npm registry, Packagist metadata, PyPI.
- What I actually did [TESTED]: cloned `WordPress/WordPress` tag 7.1.4, `elementor/elementor` tag v4.0.8, `elementor/hello-theme`, `WordPress/sqlite-database-integration` v2.1.16; downloaded `wp-cli.phar` from raw.githubusercontent; installed WP on SQLite (no server needed); activated Elementor + Hello Elementor; `wp elementor library import tpl.json` imported a hand-written container template (heading, text-editor, button, icon-box, html table, counter); rendered it with `frontend->get_builder_content_for_display()` and confirmed `e-con`, `e-con-boxed`, `e-child` and all six widget wrappers in the HTML. Also built a 2-file kit zip (manifest.json + site-settings.json) and `wp elementor kit import` set the four global colours and Jost/Roboto.
- Limits of this test rig:
  - Elementor from Git is **source, not the built plugin**: no `assets/css`/`assets/js`, header says "Version: 4.0.0". Server-side import and HTML rendering work; a pixel/visual check or opening the editor would need `npm ci && npm run build` inside the plugin (npm registry is reachable; not attempted, heavy).
  - It is not byte-identical to the wordpress.org release the owner runs, and her Elementor version is unknown.
  - Polylang from Git did not activate (needs its build step: missing `src/integrations/integration-build.php`); not pursued.
  - The admin-UI upload path (**Import Templates** button) was not exercised, only the same importer via WP-CLI.
- No server was started; nothing is left running. Test files remain in `/tmp/claude-0/-home-user-claude-glinker-web/9f6c7f8f-9ac6-586f-b3a2-6c7a8177bd09/scratchpad/wptest` (~630 MB; `tpl.json`, `kit.zip`, `wp/`, `wp-cli.phar`) and can be reused or deleted.

---

## 4. Section → widget mapping

| Section | Elementor Free | Pro alternative | Notes / what is ugly in Free |
|---|---|---|---|
| Header, 5-item nav + language switcher | **Theme header**: Hello Elementor's built-in header (**Site Settings > Header**: logo, menu, on/off) or current theme's header, with a WordPress menu (**Appearance > Menus**) + Polylang "Language switcher" menu item | Theme Builder Header template + Nav Menu widget (+ connector plugin for switcher widget and per-language header) | **Free has no Theme Builder and no Nav Menu widget.** Hello's header is plain but adequate; styling beyond its options needs Additional CSS. Alternative free plugin "Header Footer Elementor (UAE)" adds header/footer templates + nav widget, at the cost of one more plugin. One menu per language is assigned in Polylang. |
| Hero, logo left / text right | Container (row; column on mobile) > Image + inner Container > Heading (h1), Text Editor, Button(s) | same | No limitation. |
| Two dark gradient cards | Container (row) > 2 inner Containers with gradient background, radius, padding > Heading, Text Editor/Icon List, Button | same; or Call to Action widget | No limitation. Whole-card link: container `link` works when html tag is `a`. |
| 3-stat trust strip | Container (row) > 3 × Counter (animated) or 3 × Heading+Text | same | Counter animates only numbers; for "24/7"-style values use Heading. |
| Data table | **Text Editor widget containing an HTML `<table>`** (owner can edit cells) or HTML widget; wrapper class with `overflow-x:auto` for mobile | Still no core table widget; add-on needed (or TablePress + Shortcode widget) | **No table widget in Free or Pro.** Styling via Additional CSS. If the owner will edit the table often, TablePress (free) + Shortcode widget gives her a spreadsheet-like editor. |
| Sector link strip | Icon List widget, `view: inline`, each item linked; or row of Buttons | same | Fine. |
| 3-step process | Container (row) > 3 × Icon Box (number via icon or a Heading above) | same | Icon Box takes icons, not numerals; use a small Heading "01" + Icon Box without icon, or SVG/number icons. |
| 6-card grid | Container `container_type: grid`, 3 cols / 2 tablet / 1 mobile > 6 inner Containers (Heading + Text + link) or 6 × Icon Box | Loop Grid if cards are posts | Fine for static cards. |
| Filterable notes list | **Static**: cards in a grid + a small HTML-widget script (buttons filter by `data-cat`); or core **Posts** via WordPress category archive pages as "filters" (links, no JS) | Loop Grid / Posts widget + Taxonomy Filter | **Free has no Posts widget, no Loop Grid, no filter.** Static+JS is the pragmatic route if notes are few (<30) and rarely change; trade-off: adding a note means duplicating a card in Elementor, and the script lives in an HTML widget she should not touch. If notes are frequent, make them WordPress Posts and link to category archives rendered by the theme. |
| Contact form, 5 fields + KVKK consent | **Fluent Forms (free)** form, inserted with its Elementor widget or Shortcode widget; required checkbox for KVKK; FluentSMTP | Form widget (Acceptance field), Actions After Submit, built-in submissions | Form design is controlled in the form plugin, not fully in Elementor; one TR and one EN form (separate forms, one per language page). The form itself cannot travel inside the Elementor JSON — deliver a Fluent Forms export JSON (**Fluent Forms > Tools > Import Forms**) or have her build 6 fields by hand. |
| Footer | Theme footer (Hello: **Site Settings > Footer**) + footer menu; or a saved Container template inserted at the bottom of each page | Theme Builder Footer | Template-per-page means a footer edit must be repeated on every page — acceptable only for small sites; prefer the theme footer. |

If she turns out to have **Pro**: header/footer become Theme Builder templates (JSON type `header`/`footer`), the form becomes the Form widget inside the page JSON, and the notes list can be a Loop Grid. Page-body templates stay identical — so the Free-safe page JSON is the right base either way.

---

## 5. Owner-facing steps (recommended approach)

Before starting she needs from us: a folder with `01-home-tr.json`, `01-home-en.json`, … (one per page and language), `gl-kit.zip` (colours/fonts, optional), `gl-contact-form-tr.json` / `-en.json` (form), `gl-extra.css` (text to paste), and the logo file.

1. Log in to Hostinger (hpanel.hostinger.com). Go to **Websites** > next to glinkergroup.com click **Dashboard**.
2. Left menu: **Files > Backups** > create a new backup (files and database). Wait until it says completed.
3. Left menu: **WordPress > Staging** > **Create staging** > name it `test` > Create. Wait up to 15 minutes. (If you see "upgrade" instead of the button, stop and tell us.)
4. On the staging row click **Admin Panel**. You are now in a copy of your site; nothing you do here is visible to visitors.
5. **Plugins > Installed Plugins**: check whether "Elementor Pro" is in the list and write down the answer. Then **Elementor > System Info > Download System Info** and send us the file.
6. **Elementor > Settings > Features**: make sure "Container" (Flexbox Container) is **Active**; Save.
7. **Plugins > Add New**: install and activate **Polylang**, **Fluent Forms**, **FluentSMTP** (and **Rank Math SEO** only if you have no SEO plugin yet).
8. Polylang wizard (opens by itself, or **Languages**): add **Türkçe** and **English**; choose the default language; when asked, assign existing content to the default language.
9. **Languages > Settings > URL modifications**: choose "The language is set from the directory name". Keep "Hide URL language information for default language" ticked. Save. Then **Settings > Permalinks** > "Post name" > Save.
10. Colours and fonts: **Elementor > Tools > Import/Export Kit** (or "Website Templates") > **Import** > choose `gl-kit.zip` > Import. (This changes global colours and fonts only.)
11. **Templates > Saved Templates** > **Import Templates** (top of page) > choose all the `.json` page files (one at a time if on a phone) > **Import Now**. They appear in the list.
12. **Pages > Add New**: type the page title (e.g. "Ana Sayfa"), on the right choose Language = Türkçe, in "Page Attributes > Template" choose **Elementor Full Width**, click **Publish**, then **Edit with Elementor**.
13. In the editor click the grey **folder icon** in the empty area > **My Templates** > next to the matching template click **Insert** > answer **Yes** to "import document settings" > click **Publish/Update**.
14. Repeat steps 12–13 for every Turkish page.
15. English versions: in **Pages**, click the **+** under the English flag next to a Turkish page, give the English title, Publish, **Edit with Elementor**, insert the matching `-en` template, Update. Repeat for each page.
16. **Settings > Reading**: "Your homepage displays" > A static page > choose the new home page. Save.
17. Menus: **Appearance > Menus** > create "Menu TR" with the 5 pages + tick "Language switcher" (from the box on the left) > assign to the header location for Türkçe. Create "Menu EN" the same way for English.
18. Logo/header/footer: open any page with Elementor > top-left menu > **Site Settings > Site Identity** (upload logo) and **Header / Footer** (turn on logo, menu, footer text). Save.
19. **Appearance > Customize > Additional CSS**: paste the content of `gl-extra.css` > Publish.
20. Form: **Fluent Forms > Tools > Import Forms** > upload the two form files. Open each form > **Settings & Integrations > Email Notifications** > put your own email in "Send To". The KVKK checkbox is already required — check that its link opens your KVKK page.
21. Email: in hPanel **Emails** make sure a mailbox like `info@glinkergroup.com` exists. In WordPress **Settings > FluentSMTP** > Other SMTP > host `smtp.hostinger.com`, port `465`, SSL, username = the full email, password = mailbox password, From email = the same address. Click **Send Test Email** and confirm it arrives.
22. SEO: on each page, in the SEO box under the editor (Rank Math/Yoast), paste the title and description from our list. In **Rank Math > Dashboard** turn on **Redirections** and add the old → new addresses from our list.
23. Check on your phone and laptop: every page in TR and EN, the language switcher, every menu link, the table on a narrow screen, and send one real test message through each contact form. Send us screenshots of anything odd — do not publish yet if something is wrong.
24. Go live: hPanel > **Files > Backups** > make a fresh backup. Then **WordPress > Staging** > three dots next to `test` > **Publish** > confirm. Important: do not edit the live site between step 3 and now — those edits would be lost.
25. After publishing, in the live admin: **LiteSpeed Cache > Toolbox > Purge All**; **Elementor > Tools > Regenerate Files & Data**; **Settings > Reading** make sure "Discourage search engines" is **not** ticked; open the site in a private window and re-test one form. Keep the staging copy for a week, then delete it.

---

## 6. Open questions / biggest risks
1. **Live site not inspected** — Free/Pro, Elementor version, Container on/off, existing theme header, existing SEO/form/cache plugins are all unknown. Step 5's System Info file resolves this; templates should not be finalised before it arrives.
2. Local test used Elementor **from Git source at tag v4.0.8**, not the release build or her exact version; no visual check and no editor load were done.
3. Header/footer and the filterable list are the weak spots on Free; both rely on theme features or a small script.
4. Staging publish overwrites live; the Hostinger plan must include staging.
5. Polylang + her (unknown) SEO plugin and the chosen switcher need a staging check for duplicate hreflang; Polylang itself was not installed in the test rig.
6. KVKK wording is a legal matter, not a plugin setting.
7. Kit import replaces global colours/fonts site-wide — fine on a full redesign, but old pages kept alongside would change appearance.
