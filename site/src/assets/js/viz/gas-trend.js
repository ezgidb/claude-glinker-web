/*! Glinker Group — viz/gas-trend.js · self-initialising on [data-viz="gas-trend"] · no dependencies */
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

  /* ---- gas-trend: hydrogen, acetylene and moisture trends with rate-of-change highlight ---- */
  var STR = {
    en: { label: 'Illustration: hydrogen, acetylene and moisture trends over time. Hydrogen rises faster and faster until it crosses the alarm level; the period of rapid change is highlighted.',
      title: 'DISSOLVED GAS & MOISTURE · TREND', titleS: 'GAS & MOISTURE · TREND', ill: 'ILLUSTRATIVE', alarm: 'ALARM LEVEL', roc: 'RATE OF CHANGE', moist: 'MOISTURE', time: 'TIME →', level: 'LEVEL' },
    tr: { label: 'Temsili görsel: hidrojen, asetilen ve nem eğilimleri. Hidrojen giderek hızlanarak yükselir ve alarm seviyesini aşar; hızlı değişim dönemi vurgulanır.',
      title: 'ÇÖZÜNMÜŞ GAZ VE NEM · EĞİLİM', titleS: 'GAZ VE NEM · EĞİLİM', ill: 'TEMSİLİ', alarm: 'ALARM SEVİYESİ', roc: 'DEĞİŞİM HIZI', moist: 'NEM', time: 'ZAMAN →', level: 'SEVİYE' }
  }[LANG];

  mount('gas-trend', function (el) {
    var P = palette(el), N = 240, DRAW = 9, HOLD = 4.5, FADE = 1.2, TOTAL = DRAW + HOLD + FADE, ALARM = 0.64, R1 = 0.6, R2 = 0.82;
    var r = rng(909), h2 = [], c2 = [], mo = [], a = 0, b = 0, c = 0, i, cross = N - 1;
    for (i = 0; i < N; i++) {
      var x = i / (N - 1);
      a = a * 0.8 + (r() - 0.5) * 0.02; b = b * 0.8 + (r() - 0.5) * 0.012; c = c * 0.9 + (r() - 0.5) * 0.016;
      h2.push(0.17 + 0.07 * x + 0.62 * Math.pow(clamp((x - 0.42) / 0.58, 0, 1), 2.4) + a);
      c2.push(0.05 + 0.2 * smooth((x - 0.66) / 0.3) + b);
      mo.push(0.36 + 0.05 * Math.sin(x * 9) + 0.04 * x + c);
    }
    for (i = 0; i < N; i++) if (h2[i] >= ALARM) { cross = i; break; }

    function draw(ctx, w, h, t) {
      var tt = t % TOTAL, fade = tt > DRAW + HOLD ? 1 - smooth((tt - DRAW - HOLD) / FADE) : 1;
      var prog = reduced() ? 1 : clamp(tt / DRAW, 0, 1), head = Math.max(1, Math.round(prog * (N - 1)));
      var narrow = w < 430, pad = narrow ? 14 : 22, x1 = pad, x2 = w - pad, k;
      var yTop = pad + (narrow ? 62 : 48), yBot = h - pad - 20;
      function X(j) { return lerp(x1, x2 - 8, j / (N - 1)); } function Y(v) { return yBot - v * (yBot - yTop); }
      ctx.clearRect(0, 0, w, h); ctx.lineWidth = 1;
      header(ctx, P, x1, x2, pad + 8, narrow ? STR.titleS : STR.title, STR.ill, narrow ? 9 : 10);

      /* legend */
      var cH = P.trace, cC = P.warn, cM = P.fg, lx = x1, ly = pad + (narrow ? 30 : 30);
      monoFont(ctx, narrow ? 9 : 10); ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
      [['H₂', cH, 1, []], ['C₂H₂', cC, 1, []], [STR.moist, cM, 0.5, [3, 3]]].forEach(function (L) {
        ctx.strokeStyle = rgba(L[1], L[2]); ctx.lineWidth = 1.5; ctx.setLineDash(L[3]); hline(ctx, lx, lx + 18, ly); ctx.setLineDash([]);
        ctx.fillStyle = rgba(P.fg, P.dark ? 0.8 : 0.85); ctx.fillText(L[0], lx + 24, ly + 0.5); lx += 24 + ctx.measureText(L[0]).width + 18;
      });
      ctx.lineWidth = 1;

      /* grid */
      for (k = 0; k <= 12; k++) { var gx = lerp(x1, x2, k / 12); ctx.strokeStyle = rgba(P.fg, 0.07); vline(ctx, gx, yTop, yBot);
        ctx.strokeStyle = rgba(P.fg, k % 3 ? 0.2 : 0.42); vline(ctx, gx, yBot, yBot + (k % 3 ? 3 : 6)); }
      for (k = 1; k <= 4; k++) { ctx.strokeStyle = rgba(P.fg, 0.07); hline(ctx, x1, x2, Y(k / 4)); }
      ctx.strokeStyle = rgba(P.fg, 0.3); hline(ctx, x1, x2, yBot);
      cornerTicks(ctx, P, x1, yTop, x2, yBot);
      monoFont(ctx, narrow ? 9 : 10); ctx.textBaseline = 'top'; ctx.fillStyle = rgba(P.fg, P.dark ? 0.55 : 0.66);
      ctx.textAlign = 'right'; ctx.fillText(STR.time, x2, yBot + 9); ctx.textAlign = 'left'; ctx.fillText(STR.level + ' ↑', x1, yBot + 9);

      /* rate-of-change band */
      var bx1 = X(R1 * (N - 1)), bx2 = X(R2 * (N - 1)), bp = smooth((prog - R1) / (R2 - R1)) * fade;
      if (bp > 0) {
        ctx.fillStyle = rgba(P.warn, (P.dark ? 0.1 : 0.09) * bp); ctx.fillRect(bx1, yTop, (bx2 - bx1) * (reduced() ? 1 : bp), yBot - yTop);
        ctx.strokeStyle = rgba(P.warn, 0.9 * bp); ctx.beginPath(); ctx.moveTo(Math.round(bx1) + 0.5, yTop + 12); ctx.lineTo(Math.round(bx1) + 0.5, yTop + 6.5);
        ctx.lineTo(Math.round(bx2) + 0.5, yTop + 6.5); ctx.lineTo(Math.round(bx2) + 0.5, yTop + 12); ctx.stroke();
        ctx.fillStyle = rgba(P.warn, bp); ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        var rl = STR.roc + ' ↑'; if (ctx.measureText(rl).width > bx2 - bx1 + 40) rl = 'Δ/Δt ↑';
        ctx.fillText(rl, (bx1 + bx2) / 2, yTop + 18);
        /* slope triangle on H2 */
        var i1 = Math.round(R1 * (N - 1)) + 6, i2 = Math.round(R2 * (N - 1)) - 6;
        ctx.strokeStyle = rgba(P.fg, 0.5 * bp); ctx.setLineDash([2, 3]);
        ctx.beginPath(); ctx.moveTo(X(i1), Y(h2[i1])); ctx.lineTo(X(i2), Y(h2[i1])); ctx.lineTo(X(i2), Y(h2[i2])); ctx.stroke(); ctx.setLineDash([]);
      }

      /* alarm level */
      ctx.strokeStyle = rgba(P.signal, 0.9); ctx.setLineDash([6, 5]); hline(ctx, x1, x2, Y(ALARM)); ctx.setLineDash([]);
      ctx.fillStyle = rgba(P.sigText, 1); ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'; ctx.fillText(STR.alarm, x1 + 4, Y(ALARM) - 6);

      /* traces */
      function line(arr, from, to, col, al, lw, dash) {
        if (to <= from) return; ctx.beginPath();
        for (var j = from; j <= to; j++) { if (j === from) ctx.moveTo(X(j), Y(arr[j])); else ctx.lineTo(X(j), Y(arr[j])); }
        ctx.strokeStyle = rgba(col, al * fade); ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
      }
      line(mo, 0, head, cM, 0.5, 1.25, [3, 3]);
      line(c2, 0, head, cC, 1, 1.5);
      if (P.dark) line(h2, 0, Math.min(head, cross), cH, 0.12, 6);
      line(h2, 0, Math.min(head, cross), cH, 1, 1.75);
      if (head > cross) { line(h2, cross, head, P.signal, 0.16, 6); line(h2, cross, head, P.signal, 1, 2); }
      function dot(arr, col) { ctx.fillStyle = rgba(col, fade); ctx.beginPath(); ctx.arc(X(head), Y(arr[head]), 2.6, 0, 6.2832); ctx.fill(); }
      dot(c2, cC); dot(h2, head > cross ? P.signal : cH);
      if (head >= cross) {
        var ap = fade, ax = X(cross), ay = Y(ALARM);
        ctx.strokeStyle = rgba(P.signal, ap); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ax, ay, 7, 0, 6.2832); ctx.stroke();
        ctx.lineWidth = 1; ctx.strokeStyle = rgba(P.signal, 0.5 * ap); vline(ctx, ax, ay + 7, yBot);
        if (!reduced()) { var ring = ((tt * 0.45) % 1); ctx.strokeStyle = rgba(P.signal, 0.5 * (1 - ring) * ap); ctx.beginPath(); ctx.arc(ax, ay, 7 + ring * 16, 0, 6.2832); ctx.stroke(); }
      }
    }
    canvasStage(el, { label: STR.label, draw: draw, staticT: DRAW + 1 });
  });
})();
