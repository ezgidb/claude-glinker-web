/* Glinker Group — editorial pages: knowledge filter, reading progress, article contents spy.
   Each part is a no-op when its markup is absent. Content is complete without this file. */
(function () {
  'use strict';
  var doc = document;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var lang = (doc.documentElement.lang || 'en').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  var T = {
    en: { items: function (n) { return n + (n === 1 ? ' item' : ' items'); }, showing: function (a, b) { return 'Showing ' + a + ' of ' + b; } },
    tr: { items: function (n) { return n + ' içerik'; }, showing: function (a, b) { return b + ' içerikten ' + a + ' gösteriliyor'; } }
  }[lang];

  /* ---------- knowledge filter: [data-kn] > [data-kn-filter] button.kn-chip[data-tag] + [data-kn-item][data-tags] */
  $$('[data-kn]').forEach(function (kn) {
    var bar = $('[data-kn-filter]', kn);
    if (!bar) return;
    var chips = $$('.kn-chip', bar), items = $$('[data-kn-item]', kn), groups = $$('[data-kn-group]', kn);
    var count = $('[data-kn-count]', bar), empty = $('[data-kn-empty]', bar);
    function apply(tag, push) {
      var shown = 0;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String((c.dataset.tag || '') === tag)); });
      items.forEach(function (it) {
        var on = !tag || (' ' + it.dataset.tags + ' ').indexOf(' ' + tag + ' ') > -1;
        it.hidden = !on;
        if (on) shown++;
      });
      groups.forEach(function (g) { g.hidden = !$$('[data-kn-item]', g).some(function (it) { return !it.hidden; }); });
      if (count) count.textContent = tag ? T.showing(shown, items.length) : T.items(items.length);
      if (empty) empty.hidden = shown > 0;
      if (push && window.history && history.replaceState) {
        var u = new URL(location.href);
        if (tag) u.searchParams.set('tag', tag); else u.searchParams.delete('tag');
        history.replaceState(null, '', u.pathname + u.search + u.hash);
      }
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var t = c.dataset.tag || '';
        apply(c.getAttribute('aria-pressed') === 'true' && t ? '' : t, true);
      });
    });
    bar.hidden = false;
    var start = new URLSearchParams(location.search).get('tag') || '';
    if (start && !chips.some(function (c) { return c.dataset.tag === start; })) start = '';
    apply(start, false);
  });

  /* ---------- reading progress: [data-read-progress] follows [data-article] */
  var bar = $('[data-read-progress]'), art = $('[data-article]');
  if (bar && art) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var r = art.getBoundingClientRect(), vh = window.innerHeight;
      var total = r.height - vh * 0.6, done = -r.top + vh * 0.25;
      var p = total > 0 ? Math.max(0, Math.min(1, done / total)) : 1;
      bar.style.setProperty('--read', p.toFixed(4));
      bar.classList.toggle('is-active', r.top < vh * 0.5 && r.bottom > 0);
    };
    var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    update();
  }

  /* ---------- contents spy: nav[data-toc] a[href^="#"] marks the section being read */
  $$('[data-toc]').forEach(function (toc) {
    var links = $$('a[href^="#"]', toc);
    var targets = links.map(function (a) { return doc.getElementById(a.getAttribute('href').slice(1)); });
    var ticking = false;
    var update = function () {
      ticking = false;
      var cur = -1, line = window.innerHeight * 0.3;
      targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top < line) cur = i; });
      links.forEach(function (a, i) {
        var on = i === cur;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  });
})();
