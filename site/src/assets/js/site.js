/* Glinker Group — core behaviours. No dependencies. Everything is an enhancement:
   content is in the HTML and readable without this file. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };

  /* ---------- mobile nav */
  var toggle = $('[data-nav-toggle]'), nav = $('#site-nav');
  var mqMobile = window.matchMedia('(max-width: 1099.98px)');
  function setNav(open) {
    root.classList.toggle('nav-open', open);
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', String(open));
    var label = $('.nav-toggle__label', toggle);
    if (label) label.textContent = open ? label.dataset.close : label.dataset.open;
  }
  if (toggle && nav) {
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function (e) { e.preventDefault(); setNav(!root.classList.contains('nav-open')); });
    toggle.addEventListener('keydown', function (e) { if (e.key === ' ') { e.preventDefault(); toggle.click(); } });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    mqMobile.addEventListener('change', function () { setNav(false); closeMegas(); });
  }

  /* ---------- mega menu (disclosure pattern) */
  var megas = $$('[data-mega]');
  function setMega(item, open) {
    item.classList.toggle('is-open', open);
    var b = $('.nav__mega-toggle', item);
    if (b) b.setAttribute('aria-expanded', String(open));
  }
  function closeMegas(except) { megas.forEach(function (m) { if (m !== except) setMega(m, false); }); }
  megas.forEach(function (item) {
    var btn = $('.nav__mega-toggle', item), timer;
    btn.addEventListener('click', function () { var o = !item.classList.contains('is-open'); closeMegas(item); setMega(item, o); });
    item.addEventListener('mouseenter', function () { if (mqMobile.matches) return; clearTimeout(timer); timer = setTimeout(function () { setMega(item, true); }, 90); });
    item.addEventListener('mouseleave', function () { if (mqMobile.matches) return; clearTimeout(timer); timer = setTimeout(function () { setMega(item, false); }, 220); });
    item.addEventListener('focusout', function (e) { if (!mqMobile.matches && !item.contains(e.relatedTarget)) setMega(item, false); });
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = megas.filter(function (m) { return m.classList.contains('is-open'); })[0];
    if (open && !mqMobile.matches) { setMega(open, false); $('.nav__mega-toggle', open).focus(); }
    else if (root.classList.contains('nav-open')) { setNav(false); toggle.focus(); }
  });
  doc.addEventListener('click', function (e) { if (!mqMobile.matches && !e.target.closest('[data-mega]')) closeMegas(); });

  /* ---------- current page link (exact match) */
  var here = (location.pathname.split('/').pop() || 'index.html');
  $$('.site-header a[href], .site-footer a[href]').forEach(function (a) {
    var h = a.getAttribute('href');
    if (h === here && !a.classList.contains('brand') && !a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'page');
  });

  /* ---------- reveal on scroll */
  $$('[data-reveal-group]').forEach(function (g) { $$(':scope > *', g).forEach(function (el, i) { el.style.setProperty('--i', i); }); });
  var revealEls = $$('[data-reveal], [data-reveal-group], .sec-head');
  var sections = $$('main > section');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- number tick-up: <span data-count="81">81</span> */
  function tick(el) {
    var end = parseFloat(el.dataset.count), t0 = null, dur = 1400;
    if (reduce || isNaN(end)) return;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * e);
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { tick(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach(function (el) { cio.observe(el); });
  }

  /* ---------- the line: per-section progress + header tone + pagenav spy */
  var header = $('.site-header');
  var darkEls = $$('.is-dark').filter(function (el) { return !el.closest('.site-header') && (el.parentNode === $('main') || el.classList.contains('site-footer')); });
  var spyLinks = $$('.pagenav a[href^="#"]');
  var spyTargets = spyLinks.map(function (a) { return doc.getElementById(a.getAttribute('href').slice(1)); });
  var ticking = false;
  function onScroll() {
    ticking = false;
    var vh = window.innerHeight, head = vh * 0.62;
    sections.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) { if (r.bottom < 0) s.style.setProperty('--lp', 1); return; }
      var p = Math.max(0, Math.min(1, (head - r.top) / r.height));
      s.style.setProperty('--lp', reduce ? 1 : p.toFixed(4));
    });
    if (header) {
      var y = header.offsetHeight + 1, tone = 'light';
      for (var i = 0; i < darkEls.length; i++) {
        var d = darkEls[i].getBoundingClientRect();
        if (d.top <= y && d.bottom > y) { tone = 'dark'; break; }
      }
      if (header.getAttribute('data-tone') !== tone) header.setAttribute('data-tone', tone);
    }
    if (spyLinks.length) {
      var cur = -1;
      spyTargets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top < vh * 0.35) cur = i; });
      spyLinks.forEach(function (a, i) { a.classList.toggle('is-active', i === cur); });
    }
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  onScroll();

  /* ---------- tabs: .tabs > .tabs__list a.tabs__tab[href="#id"] + .tabs__panel#id */
  $$('.tabs').forEach(function (tabs) {
    var list = $('.tabs__list', tabs), tabEls = $$('.tabs__tab', tabs);
    var panels = tabEls.map(function (t) { return doc.getElementById(t.getAttribute('href').slice(1)); });
    if (!list || !tabEls.length) return;
    list.setAttribute('role', 'tablist');
    function select(i, focus) {
      tabEls.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (panels[j]) panels[j].hidden = !on;
      });
      if (focus) tabEls[i].focus();
    }
    tabEls.forEach(function (t, i) {
      t.setAttribute('role', 'tab');
      if (panels[i]) { panels[i].setAttribute('role', 'tabpanel'); panels[i].setAttribute('aria-labelledby', t.id || (t.id = panels[i].id + '-tab')); t.setAttribute('aria-controls', panels[i].id); }
      t.addEventListener('click', function (e) { e.preventDefault(); select(i); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabEls.length - 1 : null;
        if (n === null) return;
        e.preventDefault(); select((n + tabEls.length) % tabEls.length, true);
      });
    });
    var start = Math.max(0, panels.findIndex(function (p) { return p && '#' + p.id === location.hash; }));
    select(start);
  });

  /* ---------- segmented buttons: .seg > button[aria-pressed] (single choice) */
  $$('.seg').forEach(function (seg) {
    var btns = $$(':scope > button', seg);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        seg.dispatchEvent(new CustomEvent('seg:change', { bubbles: true, detail: { value: b.value || b.dataset.value } }));
      });
    });
  });

  /* ---------- contact form: <form data-contact-form data-mailto="…"> */
  var form = $('[data-contact-form]');
  if (form) {
    var topic = new URLSearchParams(location.search).get('topic');
    if (topic) {
      var r = form.querySelector('input[name="topic"][value="' + topic.replace(/[^a-z-]/g, '') + '"]');
      if (r) r.checked = true;
    }
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      $$('.field', form).forEach(function (f) {
        var input = $('input:not([type=radio]), textarea, select', f);
        if (!input) return;
        var bad = !input.checkValidity();
        f.classList.toggle('is-invalid', bad);
        input.setAttribute('aria-invalid', String(bad));
        if (bad) { ok = false; first = first || input; }
      });
      var alertEl = $('[data-form-alert]', form);
      if (alertEl) alertEl.hidden = ok;
      if (!ok) { first.focus(); return; }
      var lines = [], subject = form.dataset.subject || 'Website request';
      $$('input, textarea, select', form).forEach(function (el) {
        if (!el.name || ((el.type === 'radio' || el.type === 'checkbox') && !el.checked)) return;
        var v = el.value.trim();
        if (!v) return;
        var label = el.dataset.label || el.name;
        if (el.type === 'radio') { v = el.dataset.text || v; subject += ' — ' + v; }
        lines.push(label + ': ' + v);
      });
      var href = 'mailto:' + (form.dataset.mailto || 'koordinasyon@glinkergroup.com') +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      var status = $('[data-form-status]');
      if (status) {
        var link = $('[data-mailto-link]', status);
        if (link) link.href = href;
        status.hidden = false; status.tabIndex = -1; status.focus();
      }
      window.location.href = href;
    });
  }
})();
