/*! Glinker Group — viz/pd-pattern.js · self-initialising on [data-viz="pd-pattern"] · no dependencies */
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

  /* ---- pd-pattern: phase-resolved partial discharge pattern + activity trend ---- */
  var STR = {
    en: { label: 'Illustration: a phase-resolved partial discharge pattern. Discharge pulses accumulate in clusters on the rising quadrants of the voltage cycle; below, the activity trend rises slowly.',
      title: 'PHASE-RESOLVED PD PATTERN', titleS: 'PD PATTERN', ill: 'ILLUSTRATIVE', trend: 'PD ACTIVITY · TREND', phase: 'PHASE', ref: 'VOLTAGE REFERENCE', time: 'TIME' },
    tr: { label: 'Temsilî görsel: faz çözümlü kısmi deşarj (PRPD) deseni. Deşarj darbeleri gerilim çevriminin yükselen çeyreklerinde kümelenir; altta aktivite eğilimi yavaşça yükselir.',
      title: 'FAZ ÇÖZÜMLÜ KISMİ DEŞARJ DESENİ', titleS: 'KISMİ DEŞARJ DESENİ', ill: 'TEMSİLÎ', trend: 'KISMİ DEŞARJ AKTİVİTESİ · EĞİLİM', phase: 'FAZ', ref: 'GERİLİM REFERANSI', time: 'ZAMAN' }
  }[LANG];

  mount('pd-pattern', function (el) {
    var P = palette(el);
    var GROW = 11, HOLD = 3.5, FADE = 1.5, TOTAL = GROW + HOLD + FADE, M = 1100;
    var r = rng(4242), dots = [], i;
    function gauss() { return (r() + r() + r() + r() - 2) / 0.58; }
    for (i = 0; i < M; i++) {
      var noise = r() < 0.1, pos = r() < 0.52, ph, mag;
      if (noise) { ph = r() * 360; mag = (r() - 0.5) * 0.16; }
      else {
        ph = (pos ? 48 : 228) + gauss() * 21;
        var hump = Math.exp(-Math.pow((ph - (pos ? 44 : 224)) / 30, 2));
        mag = (0.1 + 0.72 * Math.pow(r(), 1.7)) * (0.35 + 0.65 * hump) * (pos ? 1 : -1);
      }
      dots.push({ ph: ((ph % 360) + 360) % 360, m: mag, b: GROW * Math.pow(r(), 0.62) });
    }
    var SP = 64, spark = [], rs = rng(77), acc = 0;
    for (i = 0; i < SP; i++) { acc = acc * 0.6 + (rs() - 0.5) * 0.12; spark.push(0.16 + 0.6 * Math.pow(i / (SP - 1), 1.8) + acc); }

    function draw(ctx, w, h, t) {
      var tt = t % TOTAL, fade = tt > GROW + HOLD ? 1 - smooth((tt - GROW - HOLD) / FADE) : 1;
      var narrow = w < 430, pad = narrow ? 14 : 22, x1 = pad, x2 = w - pad;
      var yTop = pad + 22, ySplit = Math.round(h * 0.66), yS1 = ySplit + (narrow ? 40 : 44), yS2 = h - pad - 2;
      var cy = (yTop + ySplit) / 2, amp = (ySplit - yTop) / 2 - 8, k, x, y;
      ctx.clearRect(0, 0, w, h); ctx.lineWidth = 1;
      header(ctx, P, x1, x2, pad + 8, narrow ? STR.titleS : STR.title, STR.ill, narrow ? 9 : 10);

      /* plot frame + grid */
      for (k = 0; k <= 8; k++) { x = lerp(x1, x2, k / 8); ctx.strokeStyle = rgba(P.fg, k % 2 ? 0.06 : 0.13); vline(ctx, x, yTop, ySplit); }
      for (k = -2; k <= 2; k++) { ctx.strokeStyle = rgba(P.fg, k === 0 ? 0.3 : 0.07); hline(ctx, x1, x2, cy - k * amp / 2); }
      cornerTicks(ctx, P, x1, yTop, x2, ySplit);
      monoFont(ctx, narrow ? 9 : 10); ctx.textBaseline = 'top'; ctx.fillStyle = rgba(P.fg, P.dark ? 0.55 : 0.66);
      for (k = 0; k <= 4; k++) { ctx.textAlign = k === 0 ? 'left' : k === 4 ? 'right' : 'center'; ctx.fillText(k * 90 + '°', lerp(x1, x2, k / 4), ySplit + 7); }

      /* sine reference */
      ctx.beginPath();
      for (k = 0; k <= 120; k++) { x = lerp(x1, x2, k / 120); y = cy - Math.sin(k / 120 * 6.2832) * amp * 0.9; if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.strokeStyle = rgba(P.fg, P.dark ? 0.34 : 0.4); ctx.lineWidth = 1; ctx.setLineDash([1, 3]); ctx.stroke(); ctx.setLineDash([]);

      /* pulses */
      var live = reduced() ? 1e9 : tt;
      for (k = 0; k < M; k++) {
        var d = dots[k]; if (d.b > live) continue;
        var age = live - d.b, fresh = Math.exp(-age * 3.2);
        x = lerp(x1, x2, d.ph / 360); y = cy - d.m * amp * 1.05;
        var s = (narrow ? 1.5 : 1.9) + fresh * 1.6;
        if (fresh > 0.25) { ctx.fillStyle = rgba(P.trace, (P.dark ? 0.16 : 0.07) * fresh * fade); ctx.beginPath(); ctx.arc(x, y, 5 + fresh * 2, 0, 6.2832); ctx.fill(); }
        ctx.fillStyle = rgba(P.trace, ((P.dark ? 0.5 : 0.46) + 0.5 * fresh) * fade);
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }

      /* trend sparkline */
      var prog = reduced() ? 1 : clamp(tt / GROW, 0, 1), n = Math.max(1, Math.round(prog * (SP - 1)));
      monoFont(ctx, narrow ? 9 : 10); ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
      ctx.fillStyle = rgba(P.fg, P.dark ? 0.72 : 0.78); ctx.fillText(STR.trend, x1, yS1 - 8);
      ctx.strokeStyle = rgba(P.fg, 0.28); hline(ctx, x1, x2, yS2);
      for (k = 0; k <= 16; k++) { ctx.strokeStyle = rgba(P.fg, k % 4 ? 0.2 : 0.4); vline(ctx, lerp(x1, x2, k / 16), yS2 - (k % 4 ? 3 : 6), yS2); }
      function sx(j) { return lerp(x1, x2 - 6, j / (SP - 1)); } function sy(j) { return yS2 - 4 - spark[j] * (yS2 - yS1 - 6); }
      ctx.beginPath(); ctx.moveTo(sx(0), yS2); for (k = 0; k <= n; k++) ctx.lineTo(sx(k), sy(k)); ctx.lineTo(sx(n), yS2); ctx.closePath();
      ctx.fillStyle = rgba(P.trace, 0.08 * fade); ctx.fill();
      ctx.beginPath(); for (k = 0; k <= n; k++) { if (k) ctx.lineTo(sx(k), sy(k)); else ctx.moveTo(sx(k), sy(k)); }
      ctx.strokeStyle = rgba(P.trace, fade); ctx.lineWidth = 1.5; ctx.lineJoin = 'round'; ctx.stroke();
      var hot = spark[n] > 0.6;
      ctx.fillStyle = rgba(hot ? P.signal : P.trace, 0.2 * fade); ctx.beginPath(); ctx.arc(sx(n), sy(n), 7, 0, 6.2832); ctx.fill();
      ctx.fillStyle = rgba(hot ? P.signal : P.trace, fade); ctx.beginPath(); ctx.arc(sx(n), sy(n), 2.6, 0, 6.2832); ctx.fill();
    }
    canvasStage(el, { label: STR.label, draw: draw, staticT: GROW + 1 });
  });
})();
