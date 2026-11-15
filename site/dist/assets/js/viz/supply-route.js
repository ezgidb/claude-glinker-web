/*! Glinker Group — viz/supply-route.js · self-initialising on [data-viz="supply-route"] · no dependencies */
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

  /* ---- supply-route: many manufacturers -> one contact -> buyer (abstract, not a map) ---- */
  var STR = {
    en: { label: 'Diagram: a field of eighty-one dots, one for each province in the supplier network, converges through a single node, Glinker Group, into one line that reaches the buyer. The line is marked Define, Build, Run.',
      field: '81 PROVINCES · MANUFACTURERS', node: 'GLINKER GROUP', one: 'ONE CONTACT', buyer: 'BUYER', steps: ['DEFINE', 'BUILD', 'RUN'], ill: 'SCHEMATIC' },
    tr: { label: 'Şema: tedarikçi ağındaki her il için bir nokta olmak üzere seksen bir noktalık alan, tek bir düğümde, Glinker Group\'ta birleşir ve alıcıya tek bir hat olarak ulaşır. Hat üzerinde Tanımla, Kur, İşlet adımları işaretlidir.',
      field: '81 İL · ÜRETİCİLER', node: 'GLINKER GROUP', one: 'TEK MUHATAP', buyer: 'ALICI', steps: ['TANIMLA', 'KUR', 'İŞLET'], ill: 'ŞEMATİK' }
  }[LANG];
  var MARK = 'M8.43 -7.07A11 11 0 1 0 11 0H0';   /* the Glinker mark, centred on its node */

  mount('supply-route', function (el) {
    var R = null, P = 0, target = 0, scrollMode = el.getAttribute('data-scroll') !== 'false', played = 0;
    var picks = { 7: 1, 22: 1, 40: 1, 58: 1, 66: 1 };
    function build(svg, w, h) {
      var vert = w < 620, pad = vert ? 14 : 24, i, rr = rng(5);
      R = { lines: [], dots: [], late: [], trunk: null };
      var side, fx, fy, gx, gy, bx, by;
      if (!vert) { side = Math.min(h - pad * 2 - 34, w * 0.3); fx = pad + 4; fy = (h - side) / 2 - 8; gx = Math.round(w * 0.6); gy = Math.round(h / 2 - 8); bx = w - pad - 12; by = gy; }
      else { side = Math.min(w - pad * 2 - 8, 250); fx = (w - side) / 2; fy = pad + 26; gx = Math.round(w / 2); gy = Math.round(fy + side + (h - fy - side) * 0.42); bx = gx; by = h - pad - 34; }
      var sp = side / 8;
      for (i = 0; i < 81; i++) {
        var cx = fx + (i % 9) * sp, cy = fy + Math.floor(i / 9) * sp, on = picks[i], d;
        if (!vert) { var mx = lerp(fx + side, gx, 0.45); d = 'M' + cx.toFixed(1) + ' ' + cy.toFixed(1) + 'C' + mx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + mx.toFixed(1) + ' ' + gy + ' ' + (gx - 22) + ' ' + gy; }
        else { var my = lerp(fy + side, gy, 0.45); d = 'M' + cx.toFixed(1) + ' ' + cy.toFixed(1) + 'C' + cx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + gx + ' ' + my.toFixed(1) + ' ' + gx + ' ' + (gy - 22); }
        var p = svgEl('path', { d: d, pathLength: 1, 'class': on ? 's-sig' : 's-dim', 'stroke-width': on ? 1.25 : 0.75, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, svg);
        if (!on) p.setAttribute('opacity', 0.55);
        R.lines.push({ n: p, d: rr() * 0.55, on: on });
      }
      for (i = 0; i < 81; i++) R.dots.push(svgEl('circle', { cx: fx + (i % 9) * sp, cy: fy + Math.floor(i / 9) * sp, r: picks[i] ? 3 : 1.9, 'class': picks[i] ? 'f-sig' : 'f-fg' }, svg));
      /* trunk */
      var tx1 = vert ? gx : gx + 22, ty1 = vert ? gy + 22 : gy, tx2 = vert ? bx : bx - 10, ty2 = vert ? by - 10 : by;
      R.trunk = svgEl('line', { x1: tx1, y1: ty1, x2: tx2, y2: ty2, pathLength: 1, 'class': 's-fg', 'stroke-width': 2, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, svg);
      STR.steps.forEach(function (s, k) {
        var u = (k + 1) / 4, x = lerp(tx1, tx2, u), y = lerp(ty1, ty2, u), g = svgEl('g', { opacity: 0 }, svg);
        if (!vert) { svgEl('line', { x1: x, x2: x, y1: y - 6, y2: y + 6, 'class': 's-fg' }, g); svgText(g, x, y + 24, s, 't-fg', 'middle'); svgText(g, x, y - 14, '0' + (k + 1), '', 'middle'); }
        else { svgEl('line', { x1: x - 6, x2: x + 6, y1: y, y2: y, 'class': 's-fg' }, g); svgText(g, x + 16, y + 3.5, '0' + (k + 1) + '  ' + s, 't-fg'); }
        R.late.push({ n: g, at: 0.72 + 0.07 * k });
      });
      /* Glinker node */
      var ng = svgEl('g', { opacity: 0, transform: 'translate(' + gx + ' ' + gy + ')' }, svg);
      svgEl('circle', { r: 22, 'class': 'f-bg s-fg', 'stroke-width': 1.5 }, ng);
      svgEl('path', { d: MARK, 'class': 's-fg', 'stroke-width': 2.4, 'stroke-linecap': 'round', transform: 'scale(.82)' }, ng);
      svgEl('circle', { r: 2.6, 'class': 'f-sig' }, ng);
      if (!vert) { svgText(ng, 0, 46, STR.node, 't-fg', 'middle'); svgText(ng, 0, 61, STR.one, 't-sig', 'middle'); }
      else { svgText(ng, 34, -3, STR.node, 't-fg'); svgText(ng, 34, 12, STR.one, 't-sig'); }
      R.late.push({ n: ng, at: 0.5 });
      /* buyer */
      var bg = svgEl('g', { opacity: 0, transform: 'translate(' + bx + ' ' + by + ')' }, svg);
      svgEl('rect', { x: -9, y: -9, width: 18, height: 18, 'class': 'f-fg' }, bg);
      svgEl('rect', { x: -14.5, y: -14.5, width: 29, height: 29, 'class': 's-dim' }, bg);
      if (!vert) svgText(bg, 14, 46, STR.buyer, 't-fg', 'end'); else svgText(bg, 0, 34, STR.buyer, 't-fg', 'middle');
      R.late.push({ n: bg, at: 0.94 });
      svgText(svg, vert ? w / 2 : fx - 2, vert ? pad + 8 : fy + side + 30, STR.field, 't-2', vert ? 'middle' : 'start');
      apply();
    }
    function apply() {
      if (!R) return;
      var p = reduced() ? 1 : P;
      R.lines.forEach(function (l) { var q = smooth((p / 0.62 - l.d) / 0.45); l.n.setAttribute('stroke-dashoffset', (1 - q).toFixed(3)); });
      R.trunk.setAttribute('stroke-dashoffset', (1 - smooth((p - 0.6) / 0.36)).toFixed(3));
      R.late.forEach(function (o) { o.n.setAttribute('opacity', smooth((p - o.at + 0.06) / 0.08).toFixed(2)); });
    }
    function measure() {
      var b = el.getBoundingClientRect(), vh = W.innerHeight || 800;
      target = clamp((vh * 0.92 - b.top) / Math.min(vh * 0.62, b.height + vh * 0.2), 0, 1);
    }
    svgStage(el, STR.label, build);
    function size() { var w = el.getBoundingClientRect().width; if (!el.style.height && !el.hasAttribute('data-fixed')) el.style.minHeight = (w < 620 ? 560 : Math.round(clamp(w * 0.36, 300, 440))) + 'px'; }
    size(); W.addEventListener('resize', size);
    if (reduced()) { P = 1; apply(); }
    if (scrollMode) { W.addEventListener('scroll', measure, { passive: true }); W.addEventListener('resize', measure); measure(); }
    ticker(el, function (t, dt) {
      if (scrollMode) { if (Math.abs(target - P) < 0.001) return; P += (target - P) * Math.min(1, dt * 7); }
      else { played += dt; P = clamp(played / 2.6, 0, 1); }
      apply();
    });
  });
})();
