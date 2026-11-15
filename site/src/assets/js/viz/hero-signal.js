/*! Glinker Group — viz/hero-signal.js · self-initialising on [data-viz="hero-signal"] · no dependencies */
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

  /* ---- hero-signal: a living trend that creeps toward an alarm threshold ---- */
  var STR = {
    en: { label: 'Illustrative animation: a measurement trend runs level for months, then slowly rises until it crosses the alarm threshold.',
      thr: 'ALARM THRESHOLD', alarm: 'ALARM', normal: 'NORMAL', rising: 'TREND RISING', ill: 'ILLUSTRATIVE',
      month: 'MONTH', state: 'STATE', level: 'LEVEL', axis: 'TIME / MONTHS', cont: 'CONTINUOUS MEASUREMENT' },
    tr: { label: 'Temsili animasyon: ölçüm eğilimi aylarca düz seyreder, sonra yavaşça yükselerek alarm eşiğini aşar.',
      thr: 'ALARM EŞİĞİ', alarm: 'ALARM', normal: 'NORMAL', rising: 'EĞİLİM YÜKSELİYOR', ill: 'TEMSİLİ',
      month: 'AY', state: 'DURUM', level: 'SEVİYE', axis: 'ZAMAN / AY', cont: 'SÜREKLİ ÖLÇÜM' }
  }[LANG];

  mount('hero-signal', function (el) {
    var P = palette(el);
    var N = 720, cur = null, ghost = null, cycle = 0;
    var SWEEP = 30, HOLD = 5, FADE = 2.2, TOTAL = SWEEP + HOLD + FADE;
    var safe = el.getAttribute('data-safe') || 'left';
    var fBase = parseFloat(el.getAttribute('data-baseline')), fThr = parseFloat(el.getAttribute('data-threshold'));

    function make(seed) {
      var r = rng(seed), a = new Float32Array(N), n = 0, slow = 0;
      var x0 = 0.5 + r() * 0.05, p1 = r() * 6.28, p2 = r() * 6.28;
      for (var i = 0; i < N; i++) {
        var x = i / (N - 1);
        n = n * 0.8 + (r() - 0.5) * 0.066;               // fine measurement noise
        slow = slow * 0.985 + (r() - 0.5) * 0.012;       // slow wander
        var v = n + slow + 0.035 * Math.sin(x * 21 + p1) + 0.02 * Math.sin(x * 57 + p2);
        if (x > x0) { var u = (x - x0) / (1 - x0); v += 1.42 * Math.pow(u, 2.35) * (1 + 0.05 * Math.sin(x * 40 + p1)); }
        a[i] = v;
      }
      var cross = N - 1;
      for (i = Math.floor(N * 0.6); i < N; i++) if (a[i] >= 1) { cross = i; break; }
      return { a: a, cross: cross, x0: x0 };
    }
    cur = make(11);

    function draw(ctx, w, h, t) {
      var c = Math.floor(t / TOTAL);
      if (c !== cycle) { cycle = c; ghost = cur; cur = make(11 + c * 7919); }
      var tt = t - c * TOTAL;
      var prog = clamp(tt / SWEEP, 0, 1);
      var fade = tt > SWEEP + HOLD ? 1 - smooth((tt - SWEEP - HOLD) / FADE) : 1;
      var narrow = w < 640;
      var padL = narrow ? 16 : Math.max(24, w * 0.04), padR = narrow ? 16 : Math.max(24, w * 0.04);
      var x1 = padL, x2 = w - padR;
      var yBase = h * (isFinite(fBase) ? fBase : (narrow ? 0.86 : 0.78));
      var yThr = h * (isFinite(fThr) ? fThr : (narrow ? 0.68 : 0.47));
      var yAxis = Math.min(h - 26, yBase + (yBase - yThr) * 0.42);
      var span = yBase - yThr;
      function X(i) { return x1 + (x2 - x1) * i / (N - 1); }
      function Y(v) { return yBase - v * span; }
      /* keep the text area quiet: fade everything toward the left / top */
      function quiet(x) { return safe === 'none' ? 1 : lerp(narrow ? 0.5 : 0.3, 1, smooth((x - x1) / (x2 - x1) / 0.72)); }

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      /* grid: 12 month columns + fine horizontal divisions */
      var cols = 12, colW = (x2 - x1) / cols, i, x, y;
      for (i = 0; i <= cols; i++) {
        x = x1 + colW * i;
        var g = ctx.createLinearGradient(0, 0, 0, yAxis);
        g.addColorStop(0, rgba(P.white, 0)); g.addColorStop(0.45, rgba(P.white, 0.035 * quiet(x) + 0.012)); g.addColorStop(1, rgba(P.white, 0.085 * quiet(x) + 0.02));
        ctx.strokeStyle = g; vline(ctx, x, 0, yAxis);
      }
      var rowH = span / 4;
      for (i = -1; i <= 7; i++) {
        y = yBase - rowH * i; if (y < h * 0.08 || y > yAxis - 2) continue;
        var gh = ctx.createLinearGradient(x1, 0, x2, 0);
        var top = clamp((y - h * 0.08) / (h * 0.3), 0, 1);
        gh.addColorStop(0, rgba(P.white, 0.015)); gh.addColorStop(1, rgba(P.white, 0.07 * top));
        ctx.strokeStyle = gh; hline(ctx, x1, x2, y);
      }
      /* time axis with ticks */
      ctx.strokeStyle = rgba(P.white, 0.22); hline(ctx, x1, x2, yAxis);
      monoFont(ctx, narrow ? 9 : 10); ctx.textBaseline = 'top'; ctx.textAlign = 'center';
      for (i = 0; i <= cols * 4; i++) {
        x = x1 + colW * i / 4; var major = i % 4 === 0;
        ctx.strokeStyle = rgba(P.white, major ? 0.4 : 0.18); vline(ctx, x, yAxis, yAxis + (major ? 7 : 3));
        if (major && i < cols * 4 && (!narrow || (i / 4) % 2 === 0)) {
          ctx.fillStyle = rgba(P.white, 0.34 * quiet(x) + 0.08);
          ctx.fillText((i / 4 + 1 < 10 ? '0' : '') + (i / 4 + 1), x + colW / 2, yAxis + 9);
        }
      }
      /* right-hand scale ticks */
      for (i = 0; i <= 12; i++) {
        y = yBase - rowH * i / 2; if (y < h * 0.12) break;
        ctx.strokeStyle = rgba(P.white, i % 2 ? 0.16 : 0.34); hline(ctx, x2 - (i % 2 ? 3 : 7), x2, y);
      }

      /* threshold: dashed, only where the action is */
      var tx1 = lerp(x1, x2, narrow ? 0.3 : 0.5);
      var tg = ctx.createLinearGradient(tx1, 0, x2, 0);
      tg.addColorStop(0, rgba(P.signal, 0)); tg.addColorStop(0.35, rgba(P.signal, 0.75)); tg.addColorStop(1, rgba(P.signal, 0.9));
      ctx.strokeStyle = tg; ctx.setLineDash([6, 5]); hline(ctx, tx1, x2, yThr); ctx.setLineDash([]);
      ctx.fillStyle = rgba(P.signal, 0.95); ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      ctx.fillText(STR.thr, lerp(tx1, x2, narrow ? 0.14 : 0.36), yThr - 7);

      /* persistence ghost of the previous sweep */
      function path(d, upto, from) {
        ctx.beginPath();
        for (var k = from || 0; k <= upto; k++) { var px = X(k), py = Y(d.a[k]); if (k === (from || 0)) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
      }
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      if (ghost && tt < SWEEP) {
        var ga = 0.1 * (1 - smooth(tt / (SWEEP * 0.5)));
        if (ga > 0.003) { path(ghost, N - 1); ctx.strokeStyle = rgba(P.trace, ga); ctx.lineWidth = 1; ctx.stroke(); }
      }

      /* live trace */
      var head = Math.round(prog * (N - 1)), crossI = cur.cross, hx = X(head), hy = Y(cur.a[head]);
      var lg = ctx.createLinearGradient(x1, 0, x2, 0);
      lg.addColorStop(0, rgba(P.trace, 0.34 * fade * (safe === 'none' ? 2.6 : 1)));
      lg.addColorStop(0.5, rgba(P.trace, 0.7 * fade)); lg.addColorStop(0.72, rgba(P.trace, fade));
      lg.addColorStop(1, rgba(P.trace, fade));
      var endT = Math.min(head, crossI);
      if (endT > 1) {
        path(cur, endT);
        ctx.strokeStyle = rgba(P.trace, 0.1 * fade); ctx.lineWidth = 6; ctx.stroke();
        ctx.strokeStyle = lg; ctx.lineWidth = 1.5; ctx.stroke();
      }
      if (head > crossI) {
        path(cur, head, crossI);
        ctx.strokeStyle = rgba(P.signal, 0.16 * fade); ctx.lineWidth = 6; ctx.stroke();
        ctx.strokeStyle = rgba(P.signal, fade); ctx.lineWidth = 1.75; ctx.stroke();
      }

      /* time cursor */
      var alarmed = head >= crossI;
      var hc = alarmed ? P.signal : P.trace;
      if (fade > 0.02) {
        ctx.lineWidth = 1; ctx.strokeStyle = rgba(P.white, 0.2 * fade * quiet(hx) + 0.03);
        ctx.setLineDash([2, 4]); vline(ctx, hx, hy + 8, yAxis); ctx.setLineDash([]);
        ctx.fillStyle = rgba(hc, 0.16 * fade); ctx.beginPath(); ctx.arc(hx, hy, 9, 0, 6.2832); ctx.fill();
        ctx.fillStyle = rgba(hc, fade); ctx.beginPath(); ctx.arc(hx, hy, 2.6, 0, 6.2832); ctx.fill();
        ctx.fillStyle = rgba(hc, 0.9 * fade); ctx.beginPath();
        ctx.moveTo(hx - 4, yAxis); ctx.lineTo(hx + 4, yAxis); ctx.lineTo(hx, yAxis - 6); ctx.closePath(); ctx.fill();
      }

      /* alarm marker at the crossing */
      if (alarmed) {
        var since = (head - crossI) / (N - 1) * SWEEP + Math.max(0, tt - SWEEP);
        var ap = smooth(since / 0.9) * fade, ax = X(crossI), ay = yThr;
        ctx.strokeStyle = rgba(P.signal, 0.55 * ap); ctx.lineWidth = 1; vline(ctx, ax, ay, yAxis);
        ctx.strokeStyle = rgba(P.signal, ap); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(ax, ay, 7, 0, 6.2832); ctx.stroke();
        var ring = (since % 2.4) / 2.4;
        if (!reduced()) { ctx.strokeStyle = rgba(P.signal, 0.5 * (1 - ring) * ap); ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(ax, ay, 7 + ring * 18, 0, 6.2832); ctx.stroke(); }
        ctx.fillStyle = rgba(P.signal, ap); ctx.beginPath(); ctx.arc(ax, ay, 2.2, 0, 6.2832); ctx.fill();
        /* flag */
        monoFont(ctx, narrow ? 10 : 11, 500);
        var txt = STR.alarm, tw = ctx.measureText(txt).width, bw = tw + 18, bh = narrow ? 20 : 22;
        var bx = Math.min(ax - bw - 14, x2 - bw - 14), by = ay - bh - 34;
        ctx.strokeStyle = rgba(P.signal, 0.8 * ap); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(ax - 5, ay - 5); ctx.lineTo(bx + bw, by + bh); ctx.stroke();
        ctx.fillStyle = rgba(P.signal, ap); ctx.fillRect(Math.round(bx), Math.round(by), Math.round(bw), bh);
        ctx.fillStyle = rgba(P.ink, ap); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(txt, Math.round(bx) + 9, Math.round(by) + bh / 2 + 0.5);
      }

      /* mono readouts, bottom right */
      var mo = Math.min(12, Math.floor(prog * 12) + 1);
      var lvl = clamp(cur.a[head], -0.2, 1.6);
      var st = alarmed ? STR.alarm : (head / (N - 1) > cur.x0 + 0.12 ? STR.rising : STR.normal);
      monoFont(ctx, narrow ? 9 : 10); ctx.textBaseline = 'top';
      var ry = yAxis + (narrow ? 26 : 28);
      if (ry + 12 < h) {
        ctx.textAlign = 'right';
        var parts = [[STR.state + ' ', 0.4, P.white], [st, 0.95, alarmed ? P.signal : P.trace], ['   ' + STR.level + ' ', 0.4, P.white],
          [(lvl * 100 < 0 ? '−' : '') + ('00' + Math.abs(Math.round(lvl * 100))).slice(-3) + ' %', 0.8, P.white],
          ['   ' + STR.month + ' ', 0.4, P.white], [(mo < 10 ? '0' : '') + mo, 0.8, P.white]];
        if (narrow) parts = parts.slice(0, 2);
        var rx = x2;
        for (i = parts.length - 1; i >= 0; i--) {
          ctx.fillStyle = rgba(parts[i][2], parts[i][1] * (0.3 + 0.7 * fade));
          ctx.fillText(parts[i][0], rx, ry); rx -= ctx.measureText(parts[i][0]).width;
        }
        ctx.textAlign = 'left'; ctx.fillStyle = rgba(P.white, 0.3);
        ctx.fillText(STR.ill + (narrow ? '' : ' · ' + STR.axis), x1, ry);
      }
    }

    canvasStage(el, { label: STR.label, draw: draw, staticT: SWEEP + 1.2 });
  }, 'dark');
})();
