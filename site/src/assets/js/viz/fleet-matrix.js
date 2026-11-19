/*! Glinker Group — viz/fleet-matrix.js · self-initialising on [data-viz="fleet-matrix"] · no dependencies */
(function () {
  'use strict';
  /* ---- shared helpers (inlined in every viz module; no external dependency) ---- */
  var D = document, W = window;
  var LANG = ((D.documentElement.getAttribute('lang') || 'en').toLowerCase().indexOf('tr') === 0) ? 'tr' : 'en';
  var MQ = W.matchMedia ? W.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var FALLBACK = { '--ink': '#0B1220', '--ink-2': '#1B2536', '--paper': '#F4F1EA', '--paper-2': '#E9E5DA',
    '--white': '#FFFDF8', '--signal': '#FF4D1F', '--trace': '#2FE0C2', '--amber': '#FFB020' };
  var MONO = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
  function reduced() { return !!MQ.matches; }
  function hexToRgb(v) {
    var m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((v || '').trim());
    if (!m) return null;
    var h = m[1]; if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  function token(el, name) {
    var v = ''; try { v = getComputedStyle(el).getPropertyValue(name); } catch (e) {}
    return hexToRgb(v) || hexToRgb(FALLBACK[name]);
  }
  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (a == null ? 1 : a) + ')'; }
  function parseColor(v) {
    var h = hexToRgb(v); if (h) return h.concat([1]);
    var m = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s\/]+([\d.]+%?))?\s*\)/.exec(v || '');
    if (m) return [+m[1], +m[2], +m[3], m[4] == null ? 1 : (/%$/.test(m[4]) ? parseFloat(m[4]) / 100 : +m[4])];
    m = /color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/.exec(v || '');
    if (m) return [Math.round(m[1] * 255), Math.round(m[2] * 255), Math.round(m[3] * 255), m[4] == null ? 1 : +m[4]];
    return null;
  }
  function lum(c) { return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255; }
  /* Theme: explicit data-theme="dark|light" wins; otherwise it follows the nearest painted
     ancestor background. Sets data-vz-theme and --vz-bg on the element (used by viz.css). */
  function setupTheme(el, force) {
    var bg = null, n = el;
    while (n && n.nodeType === 1) {
      var c = parseColor(getComputedStyle(n).backgroundColor);
      if (c && c[3] > 0.5) { bg = c; break; } n = n.parentNode;
    }
    if (!bg) bg = token(el, '--paper').concat([1]);
    var want = force || el.getAttribute('data-theme'), dark = want ? want === 'dark' : lum(bg) < 0.35;
    if (want && !force && (lum(bg) < 0.35) !== dark) { bg = token(el, dark ? '--ink' : '--paper').concat([1]); el.style.backgroundColor = rgba(bg, 1); }
    el.setAttribute('data-vz-theme', dark ? 'dark' : 'light');
    el.style.setProperty('--vz-bg', rgba(bg, 1));
    el.__vzBg = bg;
  }
  /* palette for canvas modules: resolves tokens for the element's theme */
  function palette(el) {
    var dark = el.getAttribute('data-vz-theme') === 'dark';
    var ink = token(el, '--ink'), paper = token(el, '--paper'), white = token(el, '--white');
    return { dark: dark, ink: ink, paper: paper, white: white, fg: dark ? white : ink, bg: el.__vzBg || (dark ? ink : paper),
      trace: dark ? token(el, '--trace') : ink, signal: token(el, '--signal'), amber: token(el, '--amber'),
      /* amber is too light for thin lines on paper: darken it there */
      warn: dark ? token(el, '--amber') : [168, 100, 0],
      /* vermilion as small text on paper fails AA: use a deeper tone there */
      sigText: dark ? token(el, '--signal') : [196, 48, 10] };
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
  function rng(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function svgEl(tag, attrs, parent) {
    var n = D.createElementNS('http://www.w3.org/2000/svg', tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n); return n;
  }
  function htmlEl(tag, cls, parent, text) {
    var n = D.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text;
    if (parent) parent.appendChild(n); return n;
  }
  /* run fn(el) for every [data-viz=name] once the DOM is ready; never throws */
  function mount(name, fn, force) {
    function go() {
      var els = D.querySelectorAll('[data-viz="' + name + '"]');
      for (var i = 0; i < els.length; i++) {
        if (els[i].__vizReady) continue; els[i].__vizReady = true;
        try { setupTheme(els[i], force); fn(els[i]); els[i].setAttribute('data-viz-ready', ''); }
        catch (e) { if (W.console && console.warn) console.warn('[viz:' + name + ']', e); }
      }
    }
    if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', go); else go();
  }
  /* visibility-aware animation loop. tick(t, dt) in seconds of *running* time.
     Pauses when off-screen or tab hidden. With reduced motion it never runs. */
  function ticker(el, tick) {
    var raf = 0, last = 0, t = 0, onScreen = false, enabled = true;
    function frame(now) {
      raf = 0; if (!last) last = now;
      var dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
      tick(t, dt); schedule();
    }
    function schedule() { if (!raf && enabled && onScreen && !D.hidden && !reduced()) raf = W.requestAnimationFrame(frame); }
    function stop() { if (raf) W.cancelAnimationFrame(raf); raf = 0; last = 0; }
    function check() { if (enabled && onScreen && !D.hidden && !reduced()) schedule(); else stop(); }
    if ('IntersectionObserver' in W) {
      new IntersectionObserver(function (es) { onScreen = es[es.length - 1].isIntersecting; check(); }, { rootMargin: '80px' }).observe(el);
    } else { onScreen = true; }
    D.addEventListener('visibilitychange', check);
    if (MQ.addEventListener) MQ.addEventListener('change', check);
    check();
    return { start: function () { enabled = true; check(); }, stop: function () { enabled = false; stop(); },
      running: function () { return !!raf; }, time: function () { return t; }, set: function (v) { t = v; } };
  }
  /* call cb(width, height) on container resize (and once now) */
  function onResize(el, cb) {
    var pw = -1, ph = -1;
    function run() { var r = el.getBoundingClientRect(); var w = Math.round(r.width), h = Math.round(r.height);
      if (w === pw && h === ph) return; pw = w; ph = h; if (w > 0 && h > 0) cb(w, h); }
    if ('ResizeObserver' in W) new ResizeObserver(run).observe(el); else W.addEventListener('resize', run);
    run();
  }
  /* DPR-aware canvas filling the element. draw(ctx, w, h, t) is called per frame,
     or once (t = staticT) when motion is reduced / before first frame. */
  function canvasStage(el, opts) {
    var cv = D.createElement('canvas'); cv.className = 'viz-canvas';
    /* text alternative: keep the host's own label if it has one, otherwise label the canvas */
    if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')) cv.setAttribute('aria-hidden', 'true');
    else { cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', opts.label || ''); }
    cv.style.cssText = 'display:block;width:100%;height:100%;position:absolute;inset:0;';
    if (!el.style.position && getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.appendChild(cv);
    var ctx = cv.getContext('2d'), w = 0, h = 0, tk;
    function paint(t) { if (!w || !h) return; var dpr = cv.__dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); opts.draw(ctx, w, h, t); }
    onResize(el, function (nw, nh) {
      w = nw; h = nh; var dpr = Math.min(W.devicePixelRatio || 1, 2.5); cv.__dpr = dpr;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      if (opts.resize) opts.resize(w, h);
      paint(reduced() || !tk ? opts.staticT : tk.time());
    });
    tk = ticker(el, function (t) { paint(t); });
    if (MQ.addEventListener) MQ.addEventListener('change', function () { if (reduced()) paint(opts.staticT); });
    if (D.fonts && D.fonts.ready) D.fonts.ready.then(function () { if (reduced() || !tk.running()) paint(reduced() ? opts.staticT : tk.time()); });
    return { canvas: cv, ticker: tk, repaint: function () { paint(reduced() ? opts.staticT : tk.time()); } };
  }
  function monoFont(ctx, px, weight) { ctx.font = (weight || 400) + ' ' + px + 'px ' + MONO; try { ctx.letterSpacing = (px * 0.08).toFixed(2) + 'px'; } catch (e) {} }
  function hline(ctx, x1, x2, y) { y = Math.round(y) + 0.5; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); }
  function vline(ctx, x, y1, y2) { x = Math.round(x) + 0.5; ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke(); }
  /* small mono header row used by the canvas illustrations */
  function header(ctx, P, x1, x2, y, left, right, px) {
    monoFont(ctx, px || 10); ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left'; ctx.fillStyle = rgba(P.fg, P.dark ? 0.72 : 0.78); ctx.fillText(left, x1, y);
    if (right) { ctx.textAlign = 'right'; ctx.fillStyle = rgba(P.fg, P.dark ? 0.5 : 0.6); ctx.fillText(right, x2, y); }
    ctx.textAlign = 'left';
  }
  function cornerTicks(ctx, P, x1, y1, x2, y2) {
    ctx.strokeStyle = rgba(P.fg, 0.5); ctx.lineWidth = 1; var s = 6;
    [[x1, y1, 1, 1], [x2, y1, -1, 1], [x1, y2, 1, -1], [x2, y2, -1, -1]].forEach(function (c) {
      ctx.beginPath(); ctx.moveTo(Math.round(c[0]) + 0.5 * c[2], Math.round(c[1]) + 0.5 * c[3] + s * c[3]);
      ctx.lineTo(Math.round(c[0]) + 0.5 * c[2], Math.round(c[1]) + 0.5 * c[3]); ctx.lineTo(Math.round(c[0]) + 0.5 * c[2] + s * c[2], Math.round(c[1]) + 0.5 * c[3]); ctx.stroke();
    });
  }
  /* px-exact SVG stage: build(svg, w, h) is called on every resize */
  function svgStage(el, label, build) {
    var svg = svgEl('svg', { 'class': 'vz-svg', focusable: 'false' });
    if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')) svg.setAttribute('aria-hidden', 'true');
    else { svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', label); }
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    el.appendChild(svg);
    onResize(el, function (w, h) {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h); build(svg, w, h);
    });
    return svg;
  }
  function svgText(parent, x, y, s, cls, anchor) { var t = svgEl('text', { x: x, y: y, 'class': cls || '', 'text-anchor': anchor || 'start' }, parent); t.textContent = s; return t; }

  /* ---- fleet-matrix: assets on a condition x importance matrix that re-rank ---- */
  var STR = {
    en: { label: 'Illustration: assets plotted as dots by condition and importance. As new condition data arrives the dots move and the ranking changes; the three assets with the highest priority are highlighted.',
      title: 'FLEET · CONDITION × IMPORTANCE', titleS: 'CONDITION × IMPORTANCE', ill: 'ILLUSTRATIVE', x: 'CONDITION', good: 'GOOD', poor: 'POOR', y: 'IMPORTANCE', first: 'ACT FIRST', rank: 'PRIORITY', asset: 'ASSET' },
    tr: { label: 'Temsilî görsel: varlıklar durum ve önem eksenlerinde nokta olarak gösterilir. Yeni durum verisi geldikçe noktalar yer değiştirir ve sıralama güncellenir; en yüksek öncelikli üç varlık vurgulanır.',
      title: 'VARLIK PARKI · DURUM × ÖNEM', titleS: 'DURUM × ÖNEM', ill: 'TEMSİLÎ', x: 'DURUM', good: 'İYİ', poor: 'ZAYIF', y: 'ÖNEM', first: 'ÖNCE MÜDAHALE', rank: 'ÖNCELİK', asset: 'VARLIK' }
  }[LANG];

  mount('fleet-matrix', function (el) {
    var N = 26, STEP = 4.2, MOVE = 1.4, r = rng(31), A = [], i, R = null, step = -1;
    for (i = 0; i < N; i++) A.push({ id: (i + 1 < 10 ? '0' : '') + (i + 1), imp: 0.08 + 0.86 * r(), c0: 0.06 + 0.6 * Math.pow(r(), 1.3), c1: 0, c: 0, rank: 0, ly: -1 });
    A.forEach(function (a) { a.c1 = a.c0; a.c = a.c0; });
    function score(a, c) { return c * 0.62 + a.imp * 0.38; }
    function advance() {
      A.forEach(function (a) {
        a.c0 = a.c1;
        var d = r() < 0.3 ? 0.1 + 0.16 * r() : (r() - 0.35) * 0.06;
        if (a.c1 > 0.84 && r() < 0.6) d = -(0.45 + 0.3 * r());          /* maintained: condition restored */
        a.c1 = clamp(a.c1 + d, 0.05, 0.95);
      });
    }
    function rankAll() { A.slice().sort(function (p, q) { return score(q, q.c1) - score(p, p.c1); }).forEach(function (a, k) { a.rank = k; }); }
    for (i = 0; i < 3; i++) advance(); rankAll();

    function build(svg, w, h) {
      var narrow = w < 430, pad = narrow ? 14 : 22, list = w >= 520, x1 = pad + 18, x2 = w - pad - (list ? 132 : 0), y1 = pad + 26, y2 = h - pad - 24, k;
      svgText(svg, pad, pad + 8, narrow ? STR.titleS : STR.title, 't-2'); svgText(svg, w - pad, pad + 8, STR.ill, '', 'end');
      for (k = 0; k <= 4; k++) {
        svgEl('line', { x1: lerp(x1, x2, k / 4), x2: lerp(x1, x2, k / 4), y1: y1, y2: y2, 'class': k === 2 ? 's-rule' : 's-faint' }, svg);
        svgEl('line', { x1: x1, x2: x2, y1: lerp(y1, y2, k / 4), y2: lerp(y1, y2, k / 4), 'class': k === 2 ? 's-rule' : 's-faint' }, svg);
      }
      svgEl('path', { d: 'M' + x1 + ' ' + y1 + 'V' + y2 + 'H' + x2, 'class': 's-dim' }, svg);
      /* iso-priority lines */
      [0.5, 0.66].forEach(function (s, q) {
        var ca = (s - 0.38) / 0.62, cb = s / 0.62;   /* c at imp=1 and imp=0 */
        var pa = [lerp(x1, x2, clamp(ca, 0, 1)), y1], pb = cb <= 1 ? [lerp(x1, x2, cb), y2] : [x2, lerp(y2, y1, (s - 0.62) / 0.38)];
        svgEl('line', { x1: pa[0], y1: pa[1], x2: pb[0], y2: pb[1], 'class': (q ? 's-sig' : 's-dim') + ' s-dash', 'stroke-width': 1 }, svg);
      });
      svgText(svg, x2 - 6, y1 + 14, STR.first, 't-sig', 'end');
      svgText(svg, x1, y2 + 17, STR.x + ' · ' + STR.good, ''); svgText(svg, x2, y2 + 17, STR.poor + ' →', '', 'end');
      var yl = svgText(svg, 0, 0, STR.y + ' →', '', 'start'); yl.setAttribute('transform', 'translate(' + (x1 - 8) + ' ' + y2 + ') rotate(-90)');
      R = { X: function (c) { return lerp(x1 + 8, x2 - 8, c); }, Y: function (m) { return lerp(y2 - 8, y1 + 8, m); }, dots: [], tags: [], rows: [], list: list };
      A.forEach(function (a) {
        R.dots.push(svgEl('circle', { r: narrow ? 3.5 : 4.2, cy: R.Y(a.imp) }, svg));
        R.tags.push(svgText(svg, 0, R.Y(a.imp) + 3.5, '', 't-sig'));
      });
      if (list) {
        var lx = x2 + 30; R.lx = lx; R.ly0 = y1 + 30; R.lh = Math.min(26, (y2 - y1 - 30) / 5);
        svgText(svg, lx, y1 + 8, STR.rank, 't-2'); svgEl('line', { x1: lx, x2: w - pad, y1: y1 + 16.5, y2: y1 + 16.5, 'class': 's-rule' }, svg);
        A.forEach(function (a) {
          var g = svgEl('g', null, svg); svgEl('circle', { cx: lx + 4, cy: -3.5, r: 3.5 }, g);
          svgText(g, lx + 16, 0, '', 't-fg'); svgText(g, w - pad, 0, STR.asset + ' ' + a.id, '', 'end'); R.rows.push(g);
        });
      }
      frame(tk ? tk.time() : 0);
    }
    function frame(t) {
      if (!R) return;
      var s = Math.floor(t / STEP), u = reduced() ? 1 : smooth((t - s * STEP) / MOVE);
      if (!reduced()) while (step < s) { step++; if (step > 0) { advance(); rankAll(); } }
      A.forEach(function (a, k) {
        a.c = lerp(a.c0, a.c1, u);
        var top = a.rank < 3 && u > 0.5, x = R.X(a.c), d = R.dots[k], tg = R.tags[k];
        d.setAttribute('cx', x); d.setAttribute('class', top ? 'f-sig' : (a.rank < 8 ? 'f-fg' : 'f-dim'));
        tg.textContent = top ? '0' + (a.rank + 1) : '';
        var left = false;
        if (top) A.forEach(function (o) { if (o !== a && o.rank < 8) { var dx = R.X(lerp(o.c0, o.c1, u)) - x; if (dx > 0 && dx < 30 && Math.abs(R.Y(o.imp) - R.Y(a.imp)) < 11) left = true; } });
        tg.setAttribute('x', x + (left ? -8 : 8)); tg.setAttribute('text-anchor', left ? 'end' : 'start');
        if (R.list) {
          var ty = a.rank < 5 ? R.ly0 + a.rank * R.lh : R.ly0 + 5 * R.lh + 6, g = R.rows[k];
          a.ly = a.ly < 0 || reduced() ? ty : a.ly + (ty - a.ly) * 0.14;
          g.setAttribute('transform', 'translate(0 ' + a.ly.toFixed(1) + ')');
          g.setAttribute('opacity', a.rank < 5 ? 1 : Math.max(0, 1 - Math.abs(a.ly - (R.ly0 + 4 * R.lh)) / R.lh).toFixed(2));
          g.firstChild.setAttribute('class', a.rank < 3 ? 'f-sig' : 'f-fg');
          g.childNodes[1].textContent = '0' + Math.min(9, a.rank + 1);
        }
      });
    }
    var tk = null;
    svgStage(el, STR.label, build);
    tk = ticker(el, frame);
  });
})();
