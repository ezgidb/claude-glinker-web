#!/usr/bin/env python3
"""Glinker Group static site builder. Python 3 stdlib only.

    python3 build.py            build src/ -> dist/
    python3 build.py --serve    build, then serve dist/ on http://localhost:8000

Pages are HTML fragments in src/pages/<lang>/<slug>.html with a front-matter
block (see README.md). Output is flat and uses only relative URLs:
English at dist/<slug>.html, Turkish at dist/tr/<slug>.html.
"""
import datetime
import http.server
import functools
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
DIST = ROOT / "dist"

SITE_NAME = "Glinker Group"
SITE_URL = ""  # e.g. "https://www.glinkergroup.com/" — enables canonical + absolute og:url/og:image
EMAIL = "koordinasyon@glinkergroup.com"
LANGS = ("en", "tr")
DEFAULT_LANG = "en"  # lives at dist/ root; other languages at dist/<lang>/

# ---------------------------------------------------------------- i18n
# Any {{key}} in layout, partials or pages falls back to this dictionary.
I18N = {
    "en": {
        "og_locale": "en_GB",
        "skip": "Skip to content",
        "home": "Home",
        "menu": "Menu",
        "close": "Close",
        "nav_label": "Main navigation",
        "nav_monitoring": "Online Monitoring",
        "nav_supply": "Supply &amp; Project Solutions",
        "nav_knowledge": "Knowledge Notes",
        "nav_about": "About",
        "nav_contact": "Contact",
        "mega_toggle": "Open the Online Monitoring menu",
        "mega_overview": "Online Monitoring overview",
        "mega_overview_text": "Start from your asset: eight links in the power chain, and what to measure on each.",
        "mega_tech": "Technologies",
        "mega_sectors": "Sectors",
        "mega_partner": "In Türkiye as a strategic partner of Megger",
        "tech_pd": "Partial Discharge Monitoring",
        "tech_pd_hint": "Is the insulation defect growing?",
        "tech_dga": "DGA Monitoring",
        "tech_dga_hint": "Is something developing in the oil?",
        "tech_cable": "Cable &amp; MV Monitoring",
        "tech_cable_hint": "Where along the route?",
        "tech_dpq": "Distribution Transformer &amp; Power Quality",
        "tech_dpq_hint": "Oil condition and voltage quality",
        "tech_apm": "Asset Management",
        "tech_apm_hint": "Which asset first?",
        "sector_dc": "Data Centers",
        "sector_air": "Airports",
        "sector_util": "Distribution Utilities",
        "sector_other": "Other critical facilities",
        "lang_label": "Language",
        "lang_unavailable": "This page is not yet available in this language",
        "cta_meeting": "Request a technical meeting",
        "cta_requirement": "Send your requirement",
        "cta_index": "Start",
        "cta_title": "Start with a technical conversation.",
        "cta_text": "Tell us your sector and the asset or the need. We will tell you what can be measured, what cannot, and what the next step would be.",
        "cta_topic": "monitoring",
        "slogan": "Bridging Cultures, Building Trust.",
        "foot_tagline": "Solution partner for monitoring and supply in critical electrical infrastructure.",
        "foot_identity": "Trade Facilitator — one point of access between international buyers and Turkish manufacturers.",
        "foot_col_monitoring": "Online Monitoring",
        "foot_col_sectors": "Sectors",
        "foot_col_company": "Company",
        "foot_overview": "Overview",
        "foot_privacy": "Privacy Notice",
        "foot_partner": "Online monitoring solutions are provided in Türkiye as a strategic partner of Megger.",
        "foot_trademark": "Product and company names are trademarks of their respective owners. Technical values are per manufacturer data.",
        "foot_place": "Ankara, Türkiye",
        "back_top": "Back to top",
        "per_mfr": "Per manufacturer data",
        "illustrative": "Illustrative",
    },
    "tr": {
        "og_locale": "tr_TR",
        "skip": "İçeriğe geç",
        "home": "Ana sayfa",
        "menu": "Menü",
        "close": "Kapat",
        "nav_label": "Ana menü",
        "nav_monitoring": "Online İzleme",
        "nav_supply": "Tedarik ve Proje Çözümleri",
        "nav_knowledge": "Bilgi Notları",
        "nav_about": "Hakkımızda",
        "nav_contact": "İletişim",
        "mega_toggle": "Online İzleme menüsünü aç",
        "mega_overview": "Online İzleme genel bakış",
        "mega_overview_text": "Varlığınızdan başlayın: güç zincirindeki sekiz halka ve her birinde neyin ölçüleceği.",
        "mega_tech": "Teknolojiler",
        "mega_sectors": "Sektörler",
        "mega_partner": "Türkiye’de Megger’in stratejik ortağı olarak",
        "tech_pd": "Kısmi Deşarj İzleme",
        "tech_pd_hint": "İzolasyon kusuru büyüyor mu?",
        "tech_dga": "DGA İzleme",
        "tech_dga_hint": "Yağda bir şey gelişiyor mu?",
        "tech_cable": "Kablo ve OG İzleme",
        "tech_cable_hint": "Güzergâhın neresinde?",
        "tech_dpq": "Dağıtım Trafosu ve Güç Kalitesi",
        "tech_dpq_hint": "Yağın durumu ve gerilim kalitesi",
        "tech_apm": "Varlık Yönetimi",
        "tech_apm_hint": "Önce hangi varlık?",
        "sector_dc": "Veri Merkezleri",
        "sector_air": "Havalimanları",
        "sector_util": "Dağıtım Şirketleri",
        "sector_other": "Diğer kritik tesisler",
        "lang_label": "Dil",
        "lang_unavailable": "Bu sayfa henüz bu dilde yayında değil",
        "cta_meeting": "Teknik görüşme talep edin",
        "cta_requirement": "İhtiyacınızı gönderin",
        "cta_index": "Başlangıç",
        "cta_title": "Teknik bir görüşmeyle başlayın.",
        "cta_text": "Sektörünüzü ve varlığı ya da ihtiyacı yazın. Neyin ölçülebileceğini, neyin ölçülemeyeceğini ve bir sonraki adımı söyleyelim.",
        "cta_topic": "monitoring",
        "slogan": "Bridging Cultures, Building Trust.",
        "foot_tagline": "Kritik elektrik altyapısında izleme ve tedarik için çözüm ortağı.",
        "foot_identity": "Trade Facilitator — uluslararası alıcılar ile Türk üreticiler arasında tek erişim noktası.",
        "foot_col_monitoring": "Online İzleme",
        "foot_col_sectors": "Sektörler",
        "foot_col_company": "Kurumsal",
        "foot_overview": "Genel bakış",
        "foot_privacy": "Aydınlatma Metni (KVKK)",
        "foot_partner": "Online izleme çözümleri Türkiye’de Megger’in stratejik ortağı olarak sunulmaktadır.",
        "foot_trademark": "Ürün ve şirket adları ilgili sahiplerinin ticari markalarıdır. Teknik değerler üretici verilerine dayanır.",
        "foot_place": "Ankara, Türkiye",
        "back_top": "Başa dön",
        "per_mfr": "Üretici verilerine göre",
        "illustrative": "Temsilî",
    },
}

NAV_SECTIONS = ("home", "monitoring", "supply", "knowledge", "about", "contact")

FM_RE = re.compile(r"\A\s*---\s*\n(.*?)\n---\s*\n", re.S)
INCLUDE_RE = re.compile(r"\{\{>\s*([\w-]+)((?:\s+[\w-]+=\"[^\"]*\")*)\s*\}\}")
ARG_RE = re.compile(r"([\w-]+)=\"([^\"]*)\"")
VAR_RE = re.compile(r"\{\{\s*([\w.-]+)\s*\}\}")


def parse_page(path):
    text = path.read_text(encoding="utf-8")
    meta = {}
    m = FM_RE.match(text)
    if m:
        for line in m.group(1).splitlines():
            if ":" in line and not line.lstrip().startswith("#"):
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip()
        text = text[m.end():]
    meta.setdefault("slug", path.stem)
    return meta, text


def render(text, ctx, partials, depth=0):
    """Expand {{> partial key="v"}} includes, then {{var}} placeholders."""
    if depth > 8:
        raise RuntimeError("partial recursion too deep")

    def include(m):
        name = m.group(1)
        if name not in partials:
            raise KeyError(f"unknown partial: {name}")
        local = dict(ctx)
        local.update({k: v for k, v in ARG_RE.findall(m.group(2) or "")})
        return render(partials[name], local, partials, depth + 1)

    text = INCLUDE_RE.sub(include, text)

    def var(m):
        key = m.group(1)
        if key in ctx:
            return str(ctx[key])
        lang = ctx.get("lang", DEFAULT_LANG)
        if key in I18N[lang]:
            return I18N[lang][key]
        print(f"  warning: unresolved {{{{{key}}}}} in {ctx.get('lang')}/{ctx.get('slug')}")
        return ""

    # two passes so that values coming from i18n/args may contain {{root}} etc.
    return VAR_RE.sub(var, VAR_RE.sub(var, text))


def out_path(lang, slug):
    return DIST / f"{slug}.html" if lang == DEFAULT_LANG else DIST / lang / f"{slug}.html"


def build():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)
    shutil.copytree(SRC / "assets", DIST / "assets")
    (DIST / ".nojekyll").write_text("")

    layout = (SRC / "layout.html").read_text(encoding="utf-8")
    partials = {p.stem: p.read_text(encoding="utf-8") for p in (SRC / "partials").glob("*.html")}
    pages = {lang: {p.stem: p for p in sorted((SRC / "pages" / lang).glob("*.html"))}
             if (SRC / "pages" / lang).is_dir() else {} for lang in LANGS}
    year = datetime.date.today().year
    count = 0

    for lang in LANGS:
        for slug, path in pages[lang].items():
            meta, body = parse_page(path)
            root = "" if lang == DEFAULT_LANG else "../"
            other = "tr" if lang == "en" else "en"
            has_other = slug in pages[other]
            # relative URL of the same slug in the other language
            other_url = (f"{other}/{slug}.html" if lang == DEFAULT_LANG else f"../{slug}.html")
            self_rel = f"{slug}.html" if lang == DEFAULT_LANG else f"{lang}/{slug}.html"
            other_rel = f"{slug}.html" if other == DEFAULT_LANG else f"{other}/{slug}.html"

            def switch(code, current):
                label = code.upper()
                if current:
                    return f'<span class="lang__item is-current" aria-current="true" lang="{code}">{label}</span>'
                if has_other:
                    return f'<a class="lang__item" href="{other_url}" hreflang="{code}" lang="{code}">{label}</a>'
                return (f'<span class="lang__item is-disabled" aria-disabled="true" '
                        f'title="{I18N[lang]["lang_unavailable"]}">{label}</span>')

            title = meta.get("title", SITE_NAME)
            full_title = title if SITE_NAME in title else f"{title} | {SITE_NAME}"
            head_extra = []
            if has_other:
                a, b = (root + self_rel, root + other_rel)
                if SITE_URL:
                    a, b = SITE_URL + self_rel, SITE_URL + other_rel
                head_extra.append(f'<link rel="alternate" hreflang="{lang}" href="{a}">')
                head_extra.append(f'<link rel="alternate" hreflang="{other}" href="{b}">')
            if SITE_URL:
                head_extra.append(f'<link rel="canonical" href="{SITE_URL}{self_rel}">')
                head_extra.append(f'<meta property="og:url" content="{SITE_URL}{self_rel}">')
            og_image = (SITE_URL or root) + "assets/img/og.png"

            nav = meta.get("nav", "")
            ctx = {
                "lang": lang, "slug": slug, "root": root, "year": year,
                "site_name": SITE_NAME, "email": EMAIL,
                "title": full_title, "page_title": title,
                "description": meta.get("description", ""),
                "body_class": meta.get("body_class", ""),
                "header_theme": meta.get("header", "light"),
                "nav": nav,
                "head_extra": "\n  ".join(head_extra),
                "og_image": og_image,
                "og_type": "article" if slug.startswith("note-") else "website",
                "lang_switch": switch("en", lang == "en") + switch("tr", lang == "tr"),
                "scripts": "".join(
                    f'\n<script src="{root}assets/js/viz/{name.strip()}.js" defer></script>'
                    for name in meta.get("viz", "").split(",") if name.strip()),
            }
            for sec in NAV_SECTIONS:
                ctx[f"cur_{sec}"] = ' aria-current="true"' if nav == sec else ""
            ctx.update({k: v for k, v in meta.items() if k not in ctx})
            ctx["content"] = render(body, ctx, partials)
            html = render(layout, ctx, partials)
            dest = out_path(lang, slug)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(html, encoding="utf-8")
            count += 1
    print(f"built {count} pages -> {DIST}")


if __name__ == "__main__":
    build()
    if "--serve" in sys.argv:
        handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(DIST))
        print("serving on http://localhost:8000  (Ctrl+C to stop)")
        http.server.ThreadingHTTPServer(("", 8000), handler).serve_forever()
