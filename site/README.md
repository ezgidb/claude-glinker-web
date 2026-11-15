# Glinker Group website

Static site. No runtime dependencies, no framework, no CDN. Python 3 (stdlib) builds it.

```
python3 build.py            # src/ -> dist/
python3 build.py --serve    # build, then http://localhost:8000
```

`dist/` is flat and uses only relative URLs, so it works from `file://`, any sub-folder and GitHub Pages.
English: `dist/<slug>.html`. Turkish: `dist/tr/<slug>.html`.

## Structure

```
build.py                    builder + i18n dictionary (nav, footer, CTA labels in EN and TR)
src/layout.html             <head>, header, <main>, footer
src/partials/               header, footer, cta, logo, arrow
src/pages/en|tr/<slug>.html page fragments
src/assets/css/site.css     design system (tokens, components, home)   · fonts.css · viz.css
src/assets/js/site.js       nav, mega menu, reveal, the line, counters, tabs, contact form
src/assets/js/viz/*.js      visual modules, self-initialising on [data-viz="name"]
src/assets/img/             favicon.svg, icons.svg (sprite, inlined by the build), og.png
src/assets/fonts/           Archivo, IBM Plex Sans, IBM Plex Mono (woff2, latin + latin-ext)
```

## Page format

```html
---
title: Partial Discharge Monitoring | ICMobserver | Glinker
description: Meta description, about 150 characters.
nav: monitoring          # home | monitoring | supply | knowledge | about | contact  (highlights the nav item)
header: dark             # only when the page starts with a dark hero; default light
body_class: page-tech    # optional
---
<section class="page-hero"> … </section>
<section class="section"> <div class="wrap"> … </div> </section>
{{> cta}}
```

- The slug is the file name. Use the same slug in `en/` and `tr/`; the language switcher links the pair and is disabled when the other file does not exist.
- Links between pages are plain relative: `href="dga.html"`. Assets: `{{root}}assets/...`.
- `{{key}}` resolves to a build variable (`root`, `lang`, `slug`, `year`, `email`), a front-matter key, or an i18n string from `build.py`.
- Partials: `{{> arrow}}` (arrow icon), `{{> cta}}` (closing band). Override texts per page:
  `{{> cta cta_title="Ask about DGA monitoring." cta_text="…" cta_topic="monitoring"}}`.
- Every top-level block inside a page must be a `<section>`: each one draws its segment of the line. `.no-line` opts out.
- One `<h1>` per page. Do not write `{{` in page copy.

## Components

`dist/kit.html` shows every component live with its markup. Vocabulary:

| Area | Classes |
|---|---|
| Layout | `.wrap` `.section` (`--tight` `--paper2` `--white` `--ruled` `--flush-top`) `.is-dark` `.instrument` `.is-light` `.split` (`--even` `--wide` `--rail`) `.cols-2/3/4` `.grid` `.stack` `.sticky` `.mt-4…8` |
| Section head | `.sec-head` (`--split`) `.sec-index` + `.sec-index__n` `.sec-head__title` (`--wide`) |
| Type | `.display` `.h1…h4` `.lead` `.small` `.muted` `.measure` `.hl` `.pull` `.prose` `.list-ticks` `.label` (`--fg` `--signal` `--trace`) |
| Actions | `.btn` (`--primary` `--ink` `--ghost` `--sm` `--block`) `.btn-row` `.link-arrow` `.link-inline` `.stretched` |
| Datasheet | `.spec` + `.spec__row` (`.spec--lg`) `.datasheet` (`--wide`) `.dtable` (td `data-label`) `.stat` (`--s`, `data-count`) `.callout` `.limit-note` `.defrow` `.ruler` `.ticks` |
| Content | `.card` `.note-card` `.index-list` + `.index-row` `.ledger` + `.ledger__cell` `.steps` (`--row`) + `.step` `.acc` `.tag` (`--quiet` `--solid` `--signal` `--dot` `--live`) |
| Navigation | `.crumbs` `.pagenav` `.tabs` `.seg` |
| Forms | `.form` `.field` `.form__status` `.form__alert`, `form[data-contact-form]` |
| Figures | `.fig` (`__head` `__body` `__cap`) `.viz` `.viz__fallback` `svg.dg` + `.dg-*` `.icon` |
| Page furniture | `.page-hero` (`--dark` `--simple`) `.cta-band` (via partial) |
| Motion | `data-reveal` `data-reveal="fade"` `data-reveal-group` |

Colour rules: `--signal` is for graphics, buttons (ink text) and text on dark. On paper, small vermilion text uses `--signal-deep` (the `--accent` token does this automatically). `--trace` only on dark. `--amber` only in diagrams.

## Viz hooks

Add a container; the build adds the script for every `data-viz` name found in the page. Each module sets `data-viz-ready` on its element, follows `<html lang>`, respects reduced motion, and reads the colour and font tokens. Keep a static `.viz__fallback` child for no-JS where the content matters (modules that replace content remove it; CSS hides it otherwise).

| `data-viz` | Use | Sizing / attributes |
|---|---|---|
| `hero-signal` | living trend in a dark hero | absolute layer filling its positioned parent; best ≥ 380px high; `data-safe="left|none"`, `data-baseline`, `data-threshold` |
| `test-vs-monitor` | periodic test vs continuous explainer | sets its own height; no inner padding, so pad the host (`.fig__body`); `data-mode`, `data-autoplay`, `data-theme` |
| `power-chain` | interactive asset chain | horizontal from 760px container width; best on dark; `data-root`, `data-sector`, `data-select`, `data-theme`. Fallback: `ol.chain` (see index.html) |
| `pd-pattern` `gas-trend` `pq-wave` `fleet-matrix` `cable-route` | illustrations | fill the container, 16:10 by default (override with `aspect-ratio`/height); `data-theme="dark|light"` |
| `supply-route` | buyer → Glinker → manufacturers route | own min-height; `data-scroll="false"` plays once |

Icons: `<svg class="icon" viewBox="0 0 24 24"><use href="#i-NAME"/></svg>` (ids listed in the kit).

Every illustration must read as an illustration: label it “Illustrative”.
