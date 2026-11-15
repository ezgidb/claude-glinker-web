/*! Glinker Group — viz/pq-wave.js · self-initialising on [data-viz="pq-wave"] · no dependencies */
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

  /* ---- pq-wave: three-phase voltage with a dip and a harmonic-distorted segment ---- */
  var STR = {
    en: { label: 'Illustration: a three-phase voltage waveform. One marked event is a voltage dip, where the amplitude drops for a few cycles; another is a segment distorted by harmonics.',
      title: 'THREE-PHASE VOLTAGE · EVENTS', titleS: 'VOLTAGE · EVENTS', ill: 'ILLUSTRATIVE', dip: 'VOLTAGE DIP', harm: 'HARMONICS', rms: 'RMS', evt: 'EVENT' },
    tr: { label: 'Temsili görsel: üç fazlı gerilim dalga şekli. İşaretli olaylardan biri, genliğin birkaç çevrim boyunca düştüğü gerilim çukurudur; diğeri harmoniklerle bozulmuş bir bölümdür.',
      title: 'ÜÇ FAZLI GERİLİM · OLAYLAR', titleS: 'GERİLİM · OLAYLAR', ill: 'TEMSİLİ', dip: 'GERİLİM ÇUKURU', harm: 'HARMONİKLER', rms: 'RMS', evt: 'OLAY' }
  }[LANG];

  mount('pq-wave', function (el) {
    var P = palette(el), L = 18, D1 = 3, D2 = 5.5, H1 = 8.5, H2 = 13.5, SPEED = 0.85;
    function env(c, a, b, e) { return smooth((c - a) / e) * (1 - smooth((c - b) / e)); }
    function wrap(c) { return ((c % L) + L) % L; }
    function v(c, ph) {
      c = wrap(c);
      var dip = env(c, D1, D2, 0.12), hm = env(c, H1, H2, 0.6), th = c * 6.2832 - ph * 2.0944;
      var depth = ph === 2 ? 0.15 : ph === 1 ? 0.42 : 0.5;
      return (1 - depth * dip) * Math.sin(th) + hm * (0.2 * Math.sin(5 * th + 0.4) + 0.12 * Math.sin(7 * th + 1.1) + 0.05 * Math.sin(11 * th));
    }
    function rms(c) { c = wrap(c); return 1 - 0.5 * env(c, D1 + 0.25, D2 + 0.25, 0.3) + 0.02 * env(c, H1, H2, 0.6); }

    function draw(ctx, w, h, t) {
      var narrow = w < 430, pad = narrow ? 14 : 22, x1 = pad, x2 = w - pad, k, ph;
      var win = narrow ? 7 : 12.5, c0 = reduced() ? 1.8 : t * SPEED + 1.8;
      var yTop = pad + 46, yBot = Math.round(h * 0.7), cy = (yTop + yBot) / 2, amp = (yBot - yTop) / 2 - 4;
      var rTop = yBot + (narrow ? 30 : 34), rBot = h - pad - 2;
      function X(c) { return x1 + (c - c0) / win * (x2 - x1); }
      ctx.clearRect(0, 0, w, h); ctx.lineWidth = 1;
      header(ctx, P, x1, x2, pad + 8, narrow ? STR.titleS : STR.title, STR.ill, narrow ? 9 : 10);

      /* scrolling cycle grid */
      for (k = Math.ceil(c0 * 2); k <= (c0 + win) * 2; k++) {
        var gx = X(k / 2); ctx.strokeStyle = rgba(P.fg, k % 2 ? 0.05 : 0.11); vline(ctx, gx, yTop, yBot);
        ctx.strokeStyle = rgba(P.fg, k % 2 ? 0.18 : 0.38); vline(ctx, gx, rBot - (k % 2 ? 3 : 6), rBot);
      }
      ctx.strokeStyle = rgba(P.fg, 0.24); hline(ctx, x1, x2, cy);
      ctx.strokeStyle = rgba(P.fg, 0.07); hline(ctx, x1, x2, cy - amp); hline(ctx, x1, x2, cy + amp);
      cornerTicks(ctx, P, x1, yTop, x2, yBot);

      /* events: bands + brackets (clipped to the plot) */
      ctx.save(); ctx.beginPath(); ctx.rect(x1, 0, x2 - x1, h); ctx.clip();
      monoFont(ctx, narrow ? 9 : 10);
      var evs = [[D1, D2, STR.dip, P.signal, P.sigText, '01'], [H1, H2, STR.harm, P.warn, P.warn, '02']];
      for (var rep = -1; rep <= 1; rep++) evs.forEach(function (e) {
        var base = Math.floor(c0 / L) * L + rep * L, a = X(base + e[0]), b = X(base + e[1]);
        if (b < x1 - 4 || a > x2 + 4) return;
        ctx.fillStyle = rgba(e[3], P.dark ? 0.09 : 0.07); ctx.fillRect(a, yTop, b - a, yBot - yTop);
        ctx.strokeStyle = rgba(e[3], 0.95); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(Math.round(a) + 0.5, yTop - 4); ctx.lineTo(Math.round(a) + 0.5, yTop - 10.5); ctx.lineTo(Math.round(b) + 0.5, yTop - 10.5); ctx.lineTo(Math.round(b) + 0.5, yTop - 4); ctx.stroke();
        ctx.fillStyle = rgba(e[4], 1); ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
        var lt = e[5] + ' ' + e[2], lw = ctx.measureText(lt).width, lx0 = Math.max(a, x1) + 1;
        if (lx0 + lw <= x2 && lx0 + lw <= b + 40) ctx.fillText(lt, lx0, yTop - 17);
        /* event flag on the RMS strip */
        ctx.strokeStyle = rgba(e[3], 0.8); vline(ctx, a, rTop - 4, rBot);
        ctx.fillStyle = rgba(e[3], 1); ctx.beginPath(); ctx.moveTo(a, rTop - 4); ctx.lineTo(a + 7, rTop - 0.5); ctx.lineTo(a, rTop + 3); ctx.closePath(); ctx.fill();
      });

      /* waveforms */
      var cols = [[P.fg, P.dark ? 0.26 : 0.26, 1], [P.fg, P.dark ? 0.5 : 0.5, 1], [P.trace, 1, 1.6]], order = [2, 1, 0];
      var step = Math.max(1, (x2 - x1) / 700);
      for (k = 0; k < 3; k++) {
        ph = order[k]; ctx.beginPath();
        for (var px = x1; px <= x2 + step; px += step) {
          var c = c0 + (px - x1) / (x2 - x1) * win, y = cy - v(c, ph) * amp * 0.86;
          if (px === x1) ctx.moveTo(px, y); else ctx.lineTo(px, y);
        }
        if (ph === 0 && P.dark) { ctx.strokeStyle = rgba(P.trace, 0.1); ctx.lineWidth = 5; ctx.stroke(); }
        ctx.strokeStyle = rgba(cols[k][0], cols[k][1]); ctx.lineWidth = cols[k][2]; ctx.lineJoin = 'round'; ctx.stroke();
      }

      /* RMS strip */
      ctx.lineWidth = 1; ctx.strokeStyle = rgba(P.fg, 0.28); hline(ctx, x1, x2, rBot);
      var ry = function (r) { return rBot - 6 - (r - 0.4) / 0.7 * (rBot - rTop - 6); };
      ctx.strokeStyle = rgba(P.fg, 0.22); ctx.setLineDash([2, 4]); hline(ctx, x1, x2, ry(0.9)); ctx.setLineDash([]);
      ctx.beginPath();
      for (px = x1; px <= x2 + 2; px += 2) { c = c0 + (px - x1) / (x2 - x1) * win; y = ry(rms(c)); if (px === x1) ctx.moveTo(px, y); else ctx.lineTo(px, y); }
      ctx.strokeStyle = rgba(P.trace, 0.95); ctx.lineWidth = 1.5; ctx.stroke();
      ctx.restore();
      /* phase + rms labels */
      monoFont(ctx, narrow ? 9 : 10); ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
      ctx.fillStyle = rgba(P.fg, P.dark ? 0.72 : 0.78); ctx.fillText(STR.rms + ' · L1', x1, rTop - 10);
      ctx.textAlign = 'right'; var lx = x2;
      [['L3', P.fg, 0.4], ['L2', P.fg, 0.62], ['L1', P.trace, 1]].forEach(function (p) {
        ctx.fillStyle = rgba(p[1], p[2]); ctx.fillText(p[0], lx, rTop - 10); lx -= ctx.measureText(p[0]).width + 12;
      });
    }
    canvasStage(el, { label: STR.label, draw: draw, staticT: 0 });
  });
})();
