/*! Glinker Group — viz/test-vs-monitor.js · self-initialising on [data-viz="test-vs-monitor"] · no dependencies */
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

  /* ---- test-vs-monitor: periodic test vs continuous monitoring, on one timeline ---- */
  var STR = {
    en: {
      group: 'Measurement approach', periodic: 'Periodic test', continuous: 'Continuous monitoring', ill: 'Illustrative',
      play: 'Play', pause: 'Pause', replay: 'Replay', scrub: 'Time', month: 'Month', months: 'MONTHS',
      thr: 'ALARM THRESHOLD', test: 'TEST', next: 'NEXT TEST', begins: 'FAULT BEGINS', assumed: 'ASSUMED: NORMAL',
      alarm: 'ALARM', failure: 'FAILURE · UNPLANNED OUTAGE', failureS: 'FAILURE', lead: 'WARNING TIME', planned: 'PLANNED INTERVENTION', ok: 'OK',
      chart: 'Chart: condition of one asset over fourteen months, comparing a periodic test with continuous monitoring.',
      capP: ['The asset is in service. Between tests, nothing is measured.',
        'Periodic test: the result is normal. The next test is twelve months away.',
        'A fault begins after the test. Nothing is measuring, so nothing is seen.',
        'The fault keeps growing, unseen. The last test result still says "normal".',
        'Failure and unplanned outage — before the next scheduled test.'],
      capC: ['Continuous measurement: the trend is level and normal.',
        'The same periodic test would see nothing unusual here either.',
        'A fault begins. The trend starts to rise while the asset stays in service.',
        'Alarm at the threshold — weeks before a failure would occur.',
        'The intervention is planned for a maintenance window. No unplanned outage.']
    },
    tr: {
      group: 'Ölçüm yaklaşımı', periodic: 'Periyodik test', continuous: 'Sürekli izleme', ill: 'Temsili',
      play: 'Oynat', pause: 'Duraklat', replay: 'Yeniden oynat', scrub: 'Zaman', month: 'Ay', months: 'AY',
      thr: 'ALARM EŞİĞİ', test: 'TEST', next: 'SONRAKİ TEST', begins: 'ARIZA BAŞLIYOR', assumed: 'VARSAYIM: NORMAL',
      alarm: 'ALARM', failure: 'ARIZA · PLANSIZ KESİNTİ', failureS: 'ARIZA', lead: 'KAZANILAN SÜRE', planned: 'PLANLI MÜDAHALE', ok: 'OK',
      chart: 'Grafik: bir varlığın on dört aylık durumu; periyodik test ile sürekli izlemenin karşılaştırması.',
      capP: ['Varlık işletmede. Testler arasında hiçbir şey ölçülmüyor.',
        'Periyodik test: sonuç normal. Bir sonraki teste on iki ay var.',
        'Testten sonra bir arıza başlıyor. Ölçüm yok, dolayısıyla hiçbir şey görülmüyor.',
        'Arıza görülmeden büyüyor. Son test sonucu hâlâ "normal" diyor.',
        'Arıza ve plansız kesinti — bir sonraki planlı testten önce.'],
      capC: ['Sürekli ölçüm: eğilim düz ve normal.',
        'Aynı periyodik test burada da olağan dışı bir şey görmezdi.',
        'Bir arıza başlıyor. Varlık işletmedeyken eğilim yükselmeye başlıyor.',
        'Eşikte alarm — arıza gerçekleşmeden haftalar önce.',
        'Müdahale bir bakım penceresine planlanıyor. Plansız kesinti yok.']
    }
  }[LANG];

  var T_MAX = 14, T_TEST = 1, T_NEXT = 13, T_FAULT = 3, T_FAIL = 11.5, T_FIX = 9.7, BASE = 0.2, THR = 0.5;
  function wob(t) { return 0.012 * Math.sin(t * 5.1) + 0.009 * Math.sin(t * 11.7 + 1) + 0.006 * Math.sin(t * 23.3 + 2); }
  function fault(t) { return t <= T_FAULT ? BASE : BASE + Math.pow((t - T_FAULT) / (T_FAIL - T_FAULT), 2) * (1 - BASE); }
  var T_ALARM = T_FAULT + Math.sqrt((THR - BASE) / (1 - BASE)) * (T_FAIL - T_FAULT);
  function cont(t) { /* with monitoring: intervention brings it back */
    if (t < T_FIX) return fault(t) + wob(t);
    return lerp(fault(T_FIX), BASE, smooth((t - T_FIX) / 0.45)) + wob(t);
  }

  mount('test-vs-monitor', function (el) {
    var root = htmlEl('div', 'vz-tvm');
    var head = htmlEl('div', 'vz-tvm-head', root);
    var grp = htmlEl('div', 'vz-seg', head); grp.setAttribute('role', 'group'); grp.setAttribute('aria-label', STR.group);
    var bP = htmlEl('button', 'vz-seg-btn', grp, STR.periodic), bC = htmlEl('button', 'vz-seg-btn', grp, STR.continuous);
    bP.type = bC.type = 'button';
    htmlEl('span', 'vz-tag', head, STR.ill);
    var stage = htmlEl('div', 'vz-tvm-stage', root);
    var svg = svgEl('svg', { 'class': 'vz-tvm-svg', role: 'img', 'aria-label': STR.chart, focusable: 'false' }, stage);
    var ctrl = htmlEl('div', 'vz-tvm-ctrl', root);
    var play = htmlEl('button', 'vz-play', ctrl); play.type = 'button';
    play.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="vz-i-play" d="M8 5.5v13l11-6.5z"/><path class="vz-i-pause" d="M8 5.5v13M16 5.5v13"/></svg>';
    var range = htmlEl('input', 'vz-range', ctrl); range.type = 'range'; range.min = 0; range.max = T_MAX; range.step = 0.05; range.value = 0;
    range.setAttribute('aria-label', STR.scrub);
    var cap = htmlEl('p', 'vz-tvm-cap', root); cap.setAttribute('aria-live', 'polite');
    var capIdx = htmlEl('span', 'vz-tvm-idx', cap), capTxt = htmlEl('span', 'vz-tvm-txt', cap);

    var mode = el.getAttribute('data-mode') === 'continuous' ? 'c' : 'p';
    var T = 0, playing = false, auto = el.getAttribute('data-autoplay') !== 'false', autoStage = 0, wait = 0, lastCap = '';
    var w = 0, h = 0, g = {}, X, Y, narrow = false;

    function pathFor(fn, a, b) {
      var d = '', n = Math.max(2, Math.round((b - a) * 40));
      for (var i = 0; i <= n; i++) { var t = a + (b - a) * i / n; d += (i ? 'L' : 'M') + X(t).toFixed(1) + ' ' + Y(fn(t)).toFixed(1); }
      return d;
    }
    function text(cls, x, y, s, anchor, parent) { var t = svgEl('text', { 'class': 'vz-lbl ' + cls, x: x, y: y, 'text-anchor': anchor || 'start' }, parent || svg); t.textContent = s; return t; }

    function build() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      narrow = w < 560;
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h); svg.setAttribute('width', w); svg.setAttribute('height', h);
      var pl = narrow ? 10 : 20, pr = narrow ? 10 : 20, pt = 40, pb = 34;
      var x1 = pl, x2 = w - pr, y1 = pt, y2 = h - pb;
      X = function (t) { return x1 + (x2 - x1) * t / T_MAX; };
      Y = function (v) { return y2 - (y2 - y1 - 8) * v; };
      root.style.setProperty('--vz-plot-l', pl + 'px'); root.style.setProperty('--vz-plot-r', pr + 'px');
      var i, defs = svgEl('defs', null, svg), id = 'vzclip' + Math.random().toString(36).slice(2, 8);
      var clip = svgEl('clipPath', { id: id }, defs); g.clip = svgEl('rect', { x: 0, y: 0, width: 0, height: h }, clip);
      var pat = svgEl('pattern', { id: id + 'h', width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
      svgEl('line', { x1: 0, y1: 0, x2: 0, y2: 6, 'class': 'vz-hatch' }, pat);

      /* grid + axis */
      for (i = 0; i <= T_MAX; i++) {
        svgEl('line', { x1: X(i), x2: X(i), y1: y1, y2: y2, 'class': 'vz-grid' }, svg);
        svgEl('line', { x1: X(i), x2: X(i), y1: y2, y2: y2 + (i % 2 ? 4 : 7), 'class': 'vz-tick' }, svg);
        if (i < T_MAX && (!narrow || i % 2 === 1)) text('vz-dim', X(i + 0.5), y2 + 20, (i + 1 < 10 ? '0' : '') + (i + 1), 'middle');
      }
      for (i = 1; i <= 4; i++) svgEl('line', { x1: x1, x2: x2, y1: Y(i / 4), y2: Y(i / 4), 'class': 'vz-grid' }, svg);
      svgEl('line', { x1: x1, x2: x2, y1: y2, y2: y2, 'class': 'vz-axis' }, svg);
      text('vz-dim', x1, y1 - 24, STR.months + ' →');

      /* threshold */
      g.thr = svgEl('g', { 'class': 'vz-thr' }, svg);
      svgEl('line', { x1: x1, x2: x2, y1: Y(THR), y2: Y(THR), 'class': 'vz-thr-line' }, g.thr);
      text('vz-sig', x1 + 2, Y(THR) - 7, STR.thr, 'start', g.thr);

      /* outage hatch (periodic) */
      g.outage = svgEl('rect', { x: X(T_FAIL), y: y1, width: x2 - X(T_FAIL), height: y2 - y1, fill: 'url(#' + id + 'h)', 'class': 'vz-outage' }, svg);

      /* tests */
      g.tests = [];
      [T_TEST, T_NEXT].forEach(function (tt, k) {
        var gg = svgEl('g', { 'class': 'vz-test' }, svg);
        svgEl('line', { x1: X(tt), x2: X(tt), y1: y1 - 6, y2: y2, 'class': 'vz-test-line' }, gg);
        text('vz-strong', X(tt), y1 - 12, k && !narrow ? STR.next : STR.test, 'middle', gg);
        var py = Y(BASE + wob(tt)), px = X(tt);
        svgEl('path', { d: 'M' + px + ' ' + (py - 6) + 'l6 6-6 6-6-6z', 'class': 'vz-test-pt' }, gg);
        g.tests.push(gg);
      });

      /* fault start */
      g.begin = svgEl('g', { 'class': 'vz-begin' }, svg);
      svgEl('line', { x1: X(T_FAULT), x2: X(T_FAULT), y1: Y(BASE) - 5, y2: Y(BASE) + 9, 'class': 'vz-begin-tick' }, g.begin);
      text('vz-dim2', X(T_FAULT) + 6, Y(BASE) + 19, STR.begins, 'start', g.begin);

      /* periodic: assumed-normal line, hidden trend (revealed after failure), failure */
      g.assumed = svgEl('g', { 'class': 'vz-assumed', 'clip-path': 'url(#' + id + ')' }, svg);
      svgEl('line', { x1: X(T_TEST), x2: X(T_FAIL), y1: Y(BASE), y2: Y(BASE), 'class': 'vz-assumed-line' }, g.assumed);
      text('vz-dim2', X(narrow ? 5.2 : 4.6), Y(BASE) - 8, STR.assumed, 'start', g.assumed);
      g.hidden = svgEl('path', { d: pathFor(fault, T_FAULT, T_FAIL), 'class': 'vz-hidden' }, svg);
      g.fail = svgEl('g', { 'class': 'vz-fail' }, svg);
      var fx = X(T_FAIL), fy = Y(1);
      svgEl('path', { d: 'M' + (fx - 7) + ' ' + (fy - 7) + 'l14 14M' + (fx + 7) + ' ' + (fy - 7) + 'l-14 14', 'class': 'vz-fail-x' }, g.fail);
      svgEl('circle', { cx: fx, cy: fy, r: 13, 'class': 'vz-fail-ring' }, g.fail);
      text('vz-sig vz-strong', fx - 22, fy + 4, narrow ? STR.failureS : STR.failure, 'end', g.fail);

      /* continuous: would-be trend ghost, live trace, alarm, lead time, intervention */
      g.would = svgEl('path', { d: pathFor(fault, T_ALARM, T_FAIL), 'class': 'vz-would' }, svg);
      g.trace = svgEl('g', { 'clip-path': 'url(#' + id + ')' }, svg);
      svgEl('path', { d: pathFor(cont, 0, T_MAX), 'class': 'vz-trace-glow' }, g.trace);
      svgEl('path', { d: pathFor(cont, 0, T_ALARM), 'class': 'vz-trace' }, g.trace);
      svgEl('path', { d: pathFor(cont, T_ALARM, T_FIX + 0.45), 'class': 'vz-trace vz-trace-hot' }, g.trace);
      svgEl('path', { d: pathFor(cont, T_FIX + 0.45, T_MAX), 'class': 'vz-trace' }, g.trace);
      g.alarm = svgEl('g', { 'class': 'vz-alarm' }, svg);
      var ax = X(T_ALARM), ay = Y(THR);
      svgEl('circle', { cx: ax, cy: ay, r: 7, 'class': 'vz-alarm-ring' }, g.alarm);
      svgEl('circle', { cx: ax, cy: ay, r: 2.2, 'class': 'vz-alarm-dot' }, g.alarm);
      var tw = STR.alarm.length * 7.3 + 16;
      svgEl('rect', { x: ax - tw - 12, y: ay - 34, width: tw, height: 20, 'class': 'vz-alarm-flag' }, g.alarm);
      svgEl('line', { x1: ax - 5, y1: ay - 5, x2: ax - 12, y2: ay - 14, 'class': 'vz-alarm-ring' }, g.alarm);
      text('vz-flag', ax - 12 - tw / 2, ay - 23.5, STR.alarm, 'middle', g.alarm);
      g.lead = svgEl('g', { 'class': 'vz-lead' }, svg);
      var ly = y1 + 8, lx2 = X(T_FAIL);
      svgEl('path', { d: 'M' + ax + ' ' + (ly + 6) + 'v-6H' + lx2 + 'v6', 'class': 'vz-lead-br' }, g.lead);
      svgEl('line', { x1: ax, x2: ax, y1: ly + 10, y2: ay - 9, 'class': 'vz-lead-drop' }, g.lead);
      text('vz-strong', (ax + lx2) / 2, ly - 8, STR.lead, 'middle', g.lead);
      g.fix = svgEl('g', { 'class': 'vz-fix' }, svg);
      var qx = X(T_FIX + 0.22), qy = Y(BASE);
      svgEl('path', { d: 'M' + qx + ' ' + (qy + 6) + 'l-5 8h10z', 'class': 'vz-fix-mark' }, g.fix);
      text('vz-strong', Math.min(qx, x2 - STR.planned.length * 3.5), qy + 30, STR.planned, 'middle', g.fix);

      /* cursor */
      g.cur = svgEl('g', { 'class': 'vz-cursor' }, svg);
      svgEl('line', { x1: 0, x2: 0, y1: y1 - 6, y2: y2, 'class': 'vz-cursor-line' }, g.cur);
      svgEl('path', { d: 'M-5 ' + (y2 + 1) + 'h10l-5 -7z', 'class': 'vz-cursor-tri' }, g.cur);
      g.dot = svgEl('circle', { r: 3.5, 'class': 'vz-cursor-dot' }, svg);
      update(true);
    }

    function show(node, on) { node.style.opacity = on ? 1 : 0; }
    function update(force) {
      if (!g.cur) return;
      var p = mode === 'p', x = X(T);
      root.setAttribute('data-mode', p ? 'periodic' : 'continuous');
      bP.setAttribute('aria-pressed', p ? 'true' : 'false'); bC.setAttribute('aria-pressed', p ? 'false' : 'true');
      g.clip.setAttribute('width', Math.max(0, x));
      g.cur.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
      var failed = p && T >= T_FAIL;
      /* periodic layer */
      show(g.assumed, p && T > T_TEST); show(g.hidden, failed); show(g.fail, failed); show(g.outage, failed);
      show(g.begin, p ? failed : T >= T_FAULT);
      g.thr.style.opacity = p ? 0.35 : 1;
      show(g.tests[0], T >= T_TEST - 0.02); g.tests[1].style.opacity = T >= T_NEXT && !failed ? 1 : 0.4;
      /* continuous layer */
      show(g.trace, !p); show(g.alarm, !p && T >= T_ALARM); show(g.lead, !p && T >= T_ALARM + 0.3);
      show(g.would, !p && T >= T_ALARM + 0.3); show(g.fix, !p && T >= T_FIX);
      /* live dot */
      var v = p ? null : cont(T);
      if (v == null) show(g.dot, false);
      else { show(g.dot, true); g.dot.setAttribute('cx', x); g.dot.setAttribute('cy', Y(v)); g.dot.setAttribute('class', 'vz-cursor-dot' + (T >= T_ALARM && T < T_FIX + 0.3 ? ' is-hot' : '')); }
      /* caption */
      var k = p ? (T < T_TEST ? 0 : T < T_FAULT ? 1 : T < 7 ? 2 : T < T_FAIL ? 3 : 4)
                : (T < T_TEST ? 0 : T < T_FAULT ? 1 : T < T_ALARM ? 2 : T < T_FIX ? 3 : 4);
      var mo = Math.min(T_MAX, Math.floor(T) + 1), ms = STR.month + ' ' + (mo < 10 ? '0' : '') + mo;
      var key = mode + k;
      capIdx.textContent = ms;
      if (key !== lastCap || force) { lastCap = key; capTxt.textContent = (p ? STR.capP : STR.capC)[k]; }
      root.setAttribute('data-state', failed ? 'fail' : (!p && T >= T_ALARM && T < T_FIX) ? 'alarm' : 'ok');
      if (+range.value !== T) range.value = T;
      range.setAttribute('aria-valuetext', ms + ' — ' + (p ? STR.capP : STR.capC)[k]);
      range.style.setProperty('--vz-fill', (T / T_MAX * 100) + '%');
      play.setAttribute('aria-label', playing ? STR.pause : (T >= T_MAX ? STR.replay : STR.play));
      play.setAttribute('data-playing', playing ? 'true' : 'false');
      cap.setAttribute('aria-live', playing ? 'off' : 'polite');
    }
    function setMode(m, user) { if (user) auto = false; mode = m; lastCap = ''; update(); }
    function setPlaying(v) { playing = v; if (v && T >= T_MAX) T = 0; update(); }

    bP.addEventListener('click', function () { setMode('p', true); });
    bC.addEventListener('click', function () { setMode('c', true); });
    play.addEventListener('click', function () { auto = false; setPlaying(!playing); });
    range.addEventListener('input', function () { auto = false; playing = false; T = +range.value; update(); });
    grp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); var to = mode === 'p' ? 'c' : 'p'; setMode(to, true); (to === 'p' ? bP : bC).focus(); }
    });

    function mountNow() { while (el.firstChild) el.removeChild(el.firstChild); el.appendChild(root); }
    mountNow();
    stage.style.height = '250px';
    onResize(stage, function (nw) {
      w = nw; h = Math.round(clamp(nw * 0.4, 250, 400)); stage.style.height = h + 'px'; build();
    });

    if (reduced()) { T = T_MAX; update(true); }
    else if (auto) { playing = true; }
    ticker(el, function (t, dt) {
      if (wait > 0) { wait -= dt; if (wait <= 0 && auto && autoStage === 1) { autoStage = 2; mode = 'c'; T = 0; playing = true; lastCap = ''; update(); } return; }
      if (!playing) return;
      T = Math.min(T_MAX, T + dt * T_MAX / 11);
      if (T >= T_MAX) { playing = false; if (auto && autoStage === 0 && mode === 'p') { autoStage = 1; wait = 2.2; } }
      update();
    });
    update(true);
  });
})();
