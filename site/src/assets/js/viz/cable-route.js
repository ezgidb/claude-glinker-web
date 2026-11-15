/*! Glinker Group — viz/cable-route.js · self-initialising on [data-viz="cable-route"] · no dependencies */
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

  /* ---- cable-route: HV cable joints/terminations + MV overhead feeder with located fault ---- */
  var STR = {
    en: { label: 'Illustration in two parts. Above: an underground HV cable route with terminations at both ends and four joints; one joint shows rising temperature and screen current. Below: an MV overhead feeder with three line sensors; the fault is located in the section between the second and third sensor.',
      a: 'HV CABLE CIRCUIT · JOINTS & TERMINATIONS', aS: 'HV CABLE · JOINTS', b: 'MV OVERHEAD FEEDER · LINE SENSORS', bS: 'MV FEEDER · LINE SENSORS', ill: 'ILLUSTRATIVE',
      j: 'J', s: 'S', term: 'TERMINATION', hot1: 'TEMPERATURE ↑', hot2: 'SCREEN CURRENT ↑', fault: 'FAULT SECTION LOCATED', faultS: 'FAULT SECTION' },
    tr: { label: 'İki bölümlü temsili görsel. Üstte: iki ucunda başlık ve dört ek bulunan yer altı YG kablo güzergâhı; eklerden birinde sıcaklık ve ekran akımı yükseliyor. Altta: üç hat sensörlü OG havai hat; arıza, ikinci ve üçüncü sensör arasındaki bölümde konumlandırılıyor.',
      a: 'YG KABLO HATTI · EKLER VE BAŞLIKLAR', aS: 'YG KABLO · EKLER', b: 'OG HAVAİ HAT · HAT SENSÖRLERİ', bS: 'OG HAT · SENSÖRLER', ill: 'TEMSİLİ',
      j: 'E', s: 'S', term: 'BAŞLIK', hot1: 'SICAKLIK ↑', hot2: 'EKRAN AKIMI ↑', fault: 'ARIZALI BÖLÜM BELİRLENDİ', faultS: 'ARIZALI BÖLÜM' }
  }[LANG];

  mount('cable-route', function (el) {
    var R = {}, LOOP = 8;
    function build(svg, w, h) {
      var narrow = w < 430, pad = narrow ? 14 : 22, x1 = pad, x2 = w - pad, i;
      svgText(svg, x1, pad + 8, narrow ? STR.aS : STR.a, 't-2');
      svgText(svg, x2, pad + 8, STR.ill, '', 'end');
      /* --- A: cable --- */
      var mid = Math.round(h * 0.52), gy = pad + 56, yd = gy + Math.round(clamp((mid - gy) * 0.3, 38, 64)), xa = x1 + 14, xb = x2 - 14;
      svgEl('line', { x1: x1, x2: x2, y1: gy + 0.5, y2: gy + 0.5, 'class': 's-dim' }, svg);
      for (i = 0; x1 + 6 + i * 12 < x2; i++) svgEl('line', { x1: x1 + 6 + i * 12, x2: x1 + i * 12, y1: gy + 1, y2: gy + 6, 'class': 's-rule' }, svg);
      function fy(u) { return yd + 7 * Math.sin(u * 6.2832 * 1.5) * Math.sin(u * Math.PI); }
      var d = 'M' + xa + ' ' + (gy - 22) + 'V' + (yd - 12) + 'Q' + xa + ' ' + yd + ' ' + (xa + 12) + ' ' + yd;
      for (i = 1; i <= 60; i++) { var u = i / 60; d += 'L' + lerp(xa + 12, xb - 12, u).toFixed(1) + ' ' + fy(u).toFixed(1); }
      d += 'Q' + xb + ' ' + yd + ' ' + xb + ' ' + (yd - 12) + 'V' + (gy - 22);
      svgEl('path', { d: d, 'class': 's-fg', 'stroke-width': 1.75 }, svg);
      [xa, xb].forEach(function (x, k) {  /* terminations */
        for (var q = 0; q < 3; q++) svgEl('line', { x1: x - 6 + q, x2: x + 6 - q, y1: gy - 8 - q * 5, y2: gy - 8 - q * 5, 'class': 's-fg' }, svg);
        svgEl('circle', { cx: x, cy: gy - 24, r: 2.5, 'class': 'f-fg' }, svg);
        if (!narrow) svgText(svg, x + (k ? -12 : 12), gy - 20, STR.term, '', k ? 'end' : 'start');
      });
      R.bars = []; R.joints = [];
      [0.2, 0.4, 0.6, 0.8].forEach(function (u, k) {
        var x = lerp(xa + 12, xb - 12, u), y = fy(u), hot = k === 2;
        if (hot) { R.halo = svgEl('circle', { cx: x, cy: y, r: 10, 'class': 's-sig', 'stroke-width': 1 }, svg); R.halo2 = svgEl('circle', { cx: x, cy: y, r: 10, 'class': 'f-sig', opacity: 0.14 }, svg); }
        var jr = svgEl('rect', { x: x - 10, y: y - 5.5, width: 20, height: 11, rx: 3, 'class': 'f-bg ' + (hot ? 's-sig' : 's-fg') }, svg);
        svgEl('line', { x1: x - 3.5, x2: x - 3.5, y1: y - 5.5, y2: y + 5.5, 'class': hot ? 's-sig' : 's-fg', 'stroke-width': 1 }, svg);
        svgEl('line', { x1: x + 3.5, x2: x + 3.5, y1: y - 5.5, y2: y + 5.5, 'class': hot ? 's-sig' : 's-fg', 'stroke-width': 1 }, svg);
        /* temperature bar above each joint */
        svgEl('line', { x1: x, x2: x, y1: y - 10, y2: y - 30, 'class': 's-rule', 'stroke-width': 3 }, svg);
        R.bars.push(svgEl('line', { x1: x, x2: x, y1: y - 10, y2: y - 16, 'class': hot ? 's-sig' : 's-2', 'stroke-width': 3 }, svg));
        R.joints.push({ x: x, y: y });
        svgText(svg, x, y + 22, STR.j + (k + 1), hot ? 't-sig' : '', 'middle');
        if (hot) {
          R.hot = svgEl('g', { 'class': 'fade' }, svg);
          var tx = Math.min(x, x2 - 62);
          svgText(R.hot, tx, y + 37, STR.hot1, 't-sig', 'middle'); svgText(R.hot, tx, y + 50, STR.hot2, 't-sig', 'middle');
        }
      });
      /* --- B: overhead feeder --- */
      svgEl('line', { x1: x1, x2: x2, y1: mid + 0.5, y2: mid + 0.5, 'class': 's-rule' }, svg);
      svgText(svg, x1, mid + 24, narrow ? STR.bS : STR.b, 't-2');
      var gy2 = h - pad - 30, top = Math.max(mid + 62, gy2 - 120), n = 6, px = [], sag = narrow ? 7 : 10;
      for (i = 0; i < n; i++) px.push(lerp(x1 + 16, x2 - 16, i / (n - 1)));
      svgEl('line', { x1: x1, x2: x2, y1: gy2 + 0.5, y2: gy2 + 0.5, 'class': 's-dim' }, svg);
      function span(a, b, cls) { return svgEl('path', { d: 'M' + px[a] + ' ' + top + 'Q' + (px[a] + px[b]) / 2 + ' ' + (top + sag * 2) + ' ' + px[b] + ' ' + top, 'class': cls }, svg); }
      for (i = 0; i < n - 1; i++) span(i, i + 1, 's-fg');
      R.sec = svgEl('g', { 'class': 'fade' }, svg);
      [[2, 3], [3, 4]].forEach(function (p) {
        svgEl('path', { d: 'M' + px[p[0]] + ' ' + top + 'Q' + (px[p[0]] + px[p[1]]) / 2 + ' ' + (top + sag * 2) + ' ' + px[p[1]] + ' ' + top, 'class': 's-sig', 'stroke-width': 4, opacity: 0.22 }, R.sec);
        svgEl('path', { d: 'M' + px[p[0]] + ' ' + top + 'Q' + (px[p[0]] + px[p[1]]) / 2 + ' ' + (top + sag * 2) + ' ' + px[p[1]] + ' ' + top, 'class': 's-sig s-dash' }, R.sec);
      });
      svgEl('path', { d: 'M' + px[2] + ' ' + (gy2 + 14) + 'v-6M' + px[4] + ' ' + (gy2 + 14) + 'v-6M' + px[2] + ' ' + (gy2 + 11) + 'H' + px[4], 'class': 's-sig', 'stroke-width': 1 }, R.sec);
      svgText(R.sec, (px[2] + px[4]) / 2, gy2 + 28, (px[4] - px[2]) < 150 ? STR.faultS : STR.fault, 't-sig', 'middle');
      for (i = 0; i < n; i++) {
        svgEl('line', { x1: px[i], x2: px[i], y1: top - 6, y2: gy2, 'class': 's-fg' }, svg);
        svgEl('line', { x1: px[i] - 7, x2: px[i] + 7, y1: top, y2: top, 'class': 's-fg' }, svg);
      }
      svgEl('rect', { x: px[0] - 9, y: gy2 - 14, width: 18, height: 14, 'class': 'f-bg s-fg' }, svg);
      R.sens = [];
      [1, 2, 4].forEach(function (pi, k) {
        var sx = px[pi] + (k === 2 ? -13 : 13), sy = top + sag * 0.42;
        R.sens.push(svgEl('circle', { cx: sx, cy: sy, r: 4.5, 'class': 'f-bg s-fg' }, svg));
        svgText(svg, px[pi], top - 14, STR.s + (k + 1), 't-fg', 'middle');
      });
      /* fault mark in the span 3-4 */
      var fx = (px[3] + px[4]) / 2 - 6, fyy = top + sag;
      R.bolt = svgEl('path', { d: 'M' + (fx + 3) + ' ' + (fyy - 12) + 'l-6 10h6l-5 10', 'class': 's-sig fade', 'stroke-width': 1.75, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
      R.pulse = svgEl('circle', { r: 3.5, 'class': 'f-trace' }, svg);
      R.geo = { px: px, top: top, sag: sag, fx: fx };
      frame(reduced() ? LOOP - 2 : (tk ? tk.time() : 0));
    }
    function frame(t) {
      if (!R.geo) return;
      var tt = t % LOOP, G = R.geo, endFade = 1 - smooth((tt - (LOOP - 0.8)) / 0.8);
      /* joint temperature */
      var heat = smooth(tt / 3.5) * endFade;
      R.bars.forEach(function (b, k) { var j = R.joints[k]; b.setAttribute('y2', j.y - 10 - (k === 2 ? 5 + 15 * heat : 5 + (k % 2))); });
      var pulse = (t * 0.7) % 1;
      R.halo.setAttribute('r', 10 + pulse * 14); R.halo.setAttribute('opacity', (1 - pulse) * heat * (reduced() ? 0 : 1));
      R.halo2.setAttribute('r', 10 + 8 * heat); R.halo2.setAttribute('opacity', 0.16 * heat);
      R.hot.style.opacity = heat > 0.55 ? 1 : 0;
      /* travelling fault current */
      var p = clamp((tt - 0.6) / 2.2, 0, 1), xs = G.px[0], xe = G.fx, x = lerp(xs, xe, p);
      var seg = 0; while (seg < G.px.length - 2 && x > G.px[seg + 1]) seg++;
      var u = (x - G.px[seg]) / (G.px[seg + 1] - G.px[seg]), y = G.top + G.sag * 4 * u * (1 - u);
      R.pulse.setAttribute('cx', x); R.pulse.setAttribute('cy', y); R.pulse.setAttribute('opacity', p > 0 && p < 1 ? 1 : 0);
      var located = tt > 3.1 && endFade > 0.5;
      R.sens.forEach(function (s, k) {
        var seen = k < 2 && x >= +s.getAttribute('cx') && tt > 0.6 && endFade > 0.5;
        s.setAttribute('class', seen ? 'f-sig' : 'f-bg s-fg');
      });
      R.bolt.style.opacity = p >= 1 && endFade > 0.5 ? 1 : 0; R.sec.style.opacity = located ? 1 : 0;
    }
    var tk = null;
    svgStage(el, STR.label, build);
    tk = ticker(el, frame);
  });
})();
