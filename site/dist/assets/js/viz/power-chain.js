/*! Glinker Group — viz/power-chain.js · self-initialising on [data-viz="power-chain"] · no dependencies */
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

  /* ---- power-chain: the power chain as one continuous line, with a detail panel ---- */
  var GLYPHS = {"grid":"<path d=\"M12 3 8 22M12 3l4 19M5 7h14M6.5 11.5h11M5 7v2M19 7v2M6.5 11.5v2M17.5 11.5v2M9.4 15.5l6.2 4M14.6 15.5l-6.2 4\"/>","hv-cable":"<path d=\"M2 12h5.5M16.5 12H22M10.5 9v6M13.5 9v6\"/><rect x=\"7.5\" y=\"9\" width=\"9\" height=\"6\" rx=\"1.5\"/><path d=\"M4 16.5c1 1 2 1 3 0M17 16.5c1 1 2 1 3 0\" opacity=\".55\"/>","power-transformer":"<rect x=\"3.5\" y=\"9\" width=\"13\" height=\"11\" rx=\"1\"/><path d=\"M6.5 9V5M10 9V5M13.5 9V5M5.5 5h2M9 5h2M12.5 5h2M16.5 11.5h3.5M16.5 14.5h3.5M16.5 17.5h3.5M20 10.5v8M2.5 20h15\"/>","generator":"<circle cx=\"12\" cy=\"11.5\" r=\"7\"/><path d=\"M8.5 11.5c1-2.6 2.5-2.6 3.5 0s2.5 2.6 3.5 0M19 11.5h3M7.5 17 6 21M16.5 17l1.5 4M4 21h16\"/>","gis":"<rect x=\"3\" y=\"9\" width=\"18\" height=\"8\" rx=\"4\"/><path d=\"M9 7.5v11M15 7.5v11M12 9V4.5M10 4.5h4\"/><circle cx=\"12\" cy=\"13\" r=\"1.4\"/>","mv-feeder":"<path d=\"M12 4v18M5 8h14M6 8V5.5M18 8V5.5M12 4V2.5M9 8l3 3 3-3M1.5 4.5c1.6 1.3 3 1.5 4.5 1M18 5.5c1.5.5 2.9.3 4.5-1M9.5 22h5\"/>","distribution-transformer":"<circle cx=\"12\" cy=\"9\" r=\"5\"/><circle cx=\"12\" cy=\"15\" r=\"5\"/><path d=\"M12 4V2M12 20v2\"/>","busbar":"<rect x=\"3\" y=\"5\" width=\"18\" height=\"3\" rx=\".5\"/><path d=\"M7 8v9.5M12 8v9.5M17 8v9.5\"/><circle cx=\"7\" cy=\"19\" r=\"1.4\"/><circle cx=\"12\" cy=\"19\" r=\"1.4\"/><circle cx=\"17\" cy=\"19\" r=\"1.4\"/>","fleet":"<circle cx=\"6\" cy=\"4.5\" r=\"1.4\"/><circle cx=\"6\" cy=\"9.5\" r=\"1.4\"/><circle cx=\"6\" cy=\"14.5\" r=\"1.4\"/><circle cx=\"12\" cy=\"4.5\" r=\"1.4\"/><circle cx=\"12\" cy=\"9.5\" r=\"1.4\"/><circle cx=\"12\" cy=\"14.5\" r=\"1.4\"/><circle cx=\"18\" cy=\"4.5\" r=\"1.4\"/><circle cx=\"18\" cy=\"9.5\" r=\"1.4\"/><circle cx=\"18\" cy=\"14.5\" r=\"1.4\"/><path d=\"M3 18.5v2.5h18v-2.5\"/>"};
  var ORDER = ['hv-cable', 'power-transformer', 'generator', 'gis', 'mv-feeder', 'distribution-transformer', 'busbar', 'fleet'];
  var TECH_OF = { 'hv-cable': ['cable-mv'], 'power-transformer': ['partial-discharge', 'dga'], 'generator': ['partial-discharge'], 'gis': ['partial-discharge'],
    'mv-feeder': ['cable-mv'], 'distribution-transformer': ['distribution-power-quality'], 'busbar': ['distribution-power-quality'], 'fleet': ['asset-management'] };
  /* Data: master table 2.3 and sector tables (section 4) of the verified content report. */
  var DATA = {
    en: {
      ui: { chain: 'Power chain — select an asset', sector: 'Sector', all: 'All', grid: 'Grid', ill: 'Schematic',
        f1: 'Main failure mode', f1s: 'Typical risk', f2: 'What is different about this asset', f3: 'Monitoring method', f4: 'Product',
        tech: 'Technology', inSector: 'In', of: '/', hint: 'Select an asset on the line', spans: 'Spans every asset above' },
      sectors: { 'data-centers': 'Data Centers', 'airports': 'Airports', 'distribution-utilities': 'Distribution Utilities' },
      tech: { 'partial-discharge': 'Partial Discharge Monitoring', 'dga': 'Dissolved Gas Analysis (DGA) Monitoring', 'cable-mv': 'Cable & MV Monitoring',
        'distribution-power-quality': 'Distribution Transformer & Power Quality Monitoring', 'asset-management': 'Asset Management' },
      assets: {
        'hv-cable': { s: 'HV cable circuit', n: 'HV cable circuit', fail: 'Joint and termination failure', diff: 'The weak points are spread along the route, not in one place', method: 'Current, screen current and temperature sensing at joints and terminations', product: 'Synaptec Greenlight®' },
        'power-transformer': { s: 'Power transformer', n: 'Power transformer', fail: 'Insulation breakdown in windings and bushings; developing internal fault', diff: 'Long replacement lead time: early warning has the highest value here', method: 'Partial discharge monitoring + dissolved gas and moisture monitoring', product: 'ICMobserver; InsuLogix® G2' },
        'generator': { s: 'Generator & HV motor', n: 'Generator and HV motor', fail: 'Stator winding insulation deterioration', diff: 'Some partial discharge is always present in normal operation, so the trend matters, not the single reading', method: 'Partial discharge monitoring', product: 'ICMobserver' },
        'gis': { s: 'Gas-insulated switchgear', n: 'Gas-insulated switchgear (GIS)', fail: 'Internal insulation defects', diff: 'Sealed and compact: measurement is made in the UHF range from inside the enclosure', method: 'UHF partial discharge monitoring', product: 'On request' },
        'mv-feeder': { s: 'MV overhead feeder', n: 'MV overhead feeder', fail: 'Line faults, broken conductors, high-impedance faults', diff: 'The task is locating a fault on a long line, not assessing insulation', method: 'Line-mounted current and voltage sensors with analytics software', product: 'MS5200 with Megger Grid Analytics' },
        'distribution-transformer': { s: 'Distribution transformer', n: 'Distribution transformer', fail: 'Oil ageing and moisture', diff: 'Many low-cost units: one sensor per unit, not a full monitoring system', method: 'Online oil-condition sensing', product: 'TrafoStick (A. Eberle)' },
        'busbar': { s: 'Supply point · busbar', n: 'Supply point / busbar', fail: 'Voltage dips, harmonics, flicker, unbalance', diff: 'A network property measured at a connection point, not a condition of one asset', method: 'Class A power quality measurement', product: 'PQI-DA smart (A. Eberle)' },
        'fleet': { s: 'Whole fleet', n: 'Whole fleet', fail: 'Maintenance and investment effort placed on the wrong assets', diff: 'Combines data from all rows above; adds no new measurement', method: 'Asset performance management software', product: 'IPS®APM' }
      },
      sec: {
        'data-centers': {
          'power-transformer': ['Main and step-down transformers', 'Insulation fault developing unnoticed under continuous high load'],
          'busbar': ['Incoming supply and main busbars', 'Voltage dips and harmonics from non-linear load'],
          'generator': ['Standby generators', 'Stator insulation deterioration on machines that rarely run'],
          'hv-cable': ['HV grid connection cable', 'Joint or termination failure on the single supply route'],
          'fleet': ['Whole power chain', 'No single view of asset condition across sites'] },
        'airports': {
          'power-transformer': ['Intake substation transformers', 'Internal fault leading to loss of the main supply'],
          'hv-cable': ['HV supply cables', 'Joint and termination failure on supply routes'],
          'distribution-transformer': ['Terminal and airfield distribution transformers', 'Oil ageing and moisture across many units'],
          'busbar': ['Supply to sensitive systems', 'Voltage dips and harmonics affecting electronic loads'] },
        'distribution-utilities': {
          'power-transformer': ['Power transformers in primary substations', 'Developing internal fault; long replacement lead time'],
          'mv-feeder': ['MV overhead feeders', 'Long fault-location times; broken conductors'],
          'hv-cable': ['HV cable circuits', 'Joint and termination failure'],
          'distribution-transformer': ['Distribution transformers', 'Oil ageing and moisture across a large population'],
          'busbar': ['Supply points and the whole fleet', 'Supply quality obligations; prioritising investment'],
          'fleet': ['Supply points and the whole fleet', 'Supply quality obligations; prioritising investment'] }
      }
    },
    tr: {
      ui: { chain: 'Güç zinciri — bir varlık seçin', sector: 'Sektör', all: 'Tümü', grid: 'Şebeke', ill: 'Şematik',
        f1: 'Başlıca arıza modu', f1s: 'Tipik risk', f2: 'Bu varlığı farklı kılan', f3: 'İzleme yöntemi', f4: 'Ürün',
        tech: 'Teknoloji', inSector: '', of: '/', hint: 'Hat üzerinden bir varlık seçin', spans: 'Yukarıdaki tüm varlıkları kapsar' },
      sectors: { 'data-centers': 'Veri Merkezleri', 'airports': 'Havalimanları', 'distribution-utilities': 'Dağıtım Şirketleri' },
      tech: { 'partial-discharge': 'Kısmi Deşarj İzleme', 'dga': 'Çözünmüş Gaz Analizi (DGA) İzleme', 'cable-mv': 'Kablo ve OG İzleme',
        'distribution-power-quality': 'Dağıtım Trafosu ve Güç Kalitesi İzleme', 'asset-management': 'Varlık Yönetimi' },
      assets: {
        'hv-cable': { s: 'YG kablo hattı', n: 'YG kablo hattı', fail: 'Ek ve başlık arızası', diff: 'Zayıf noktalar tek bir yerde değil, güzergâh boyunca dağılmıştır', method: 'Ek ve başlıklarda akım, ekran akımı ve sıcaklık algılama', product: 'Synaptec Greenlight®' },
        'power-transformer': { s: 'Güç trafosu', n: 'Güç trafosu', fail: 'Sargı ve buşinglerde yalıtım delinmesi; gelişmekte olan iç arıza', diff: 'Yenisinin temin süresi uzundur: erken uyarının değeri en çok buradadır', method: 'Kısmi deşarj izleme + çözünmüş gaz ve nem izleme', product: 'ICMobserver; InsuLogix® G2' },
        'generator': { s: 'Jeneratör ve YG motor', n: 'Jeneratör ve YG motor', fail: 'Stator sargı yalıtımının bozulması', diff: 'Normal işletmede her zaman bir miktar kısmi deşarj vardır; bu yüzden önemli olan tek bir okuma değil, eğilimdir', method: 'Kısmi deşarj izleme', product: 'ICMobserver' },
        'gis': { s: 'Gaz yalıtımlı şalt', n: 'Gaz yalıtımlı şalt (GIS)', fail: 'İç yalıtım kusurları', diff: 'Kapalı ve kompakt yapı: ölçüm, muhafazanın içinden UHF bandında yapılır', method: 'UHF kısmi deşarj izleme', product: 'Talep üzerine' },
        'mv-feeder': { s: 'OG havai hat fideri', n: 'OG havai hat fideri', fail: 'Hat arızaları, iletken kopması, yüksek empedanslı arızalar', diff: 'Buradaki iş yalıtımı değerlendirmek değil, uzun bir hat üzerinde arızanın yerini bulmaktır', method: 'Hatta monte akım ve gerilim sensörleri ile analiz yazılımı', product: 'MS5200 ve Megger Grid Analytics' },
        'distribution-transformer': { s: 'Dağıtım trafosu', n: 'Dağıtım trafosu', fail: 'Yağ yaşlanması ve nem', diff: 'Çok sayıda düşük maliyetli ünite: tam bir izleme sistemi değil, ünite başına bir sensör', method: 'Çevrim içi yağ durumu algılama', product: 'TrafoStick (A. Eberle)' },
        'busbar': { s: 'Besleme noktası · bara', n: 'Besleme noktası / bara', fail: 'Gerilim çukurları, harmonikler, fliker, dengesizlik', diff: 'Tek bir varlığın durumu değil, bir bağlantı noktasında ölçülen şebeke özelliğidir', method: 'A sınıfı güç kalitesi ölçümü', product: 'PQI-DA smart (A. Eberle)' },
        'fleet': { s: 'Tüm filo', n: 'Tüm filo', fail: 'Bakım ve yatırım emeğinin yanlış varlıklara harcanması', diff: 'Yukarıdaki tüm satırların verisini birleştirir; yeni bir ölçüm eklemez', method: 'Varlık performans yönetimi yazılımı', product: 'IPS®APM' }
      },
      sec: {
        'data-centers': {
          'power-transformer': ['Ana ve indirici trafolar', 'Sürekli yüksek yük altında fark edilmeden gelişen yalıtım arızası'],
          'busbar': ['Giriş beslemesi ve ana baralar', 'Doğrusal olmayan yükten kaynaklanan gerilim çukurları ve harmonikler'],
          'generator': ['Yedek jeneratörler', 'Nadiren çalışan makinelerde stator yalıtımının bozulması'],
          'hv-cable': ['YG şebeke bağlantı kablosu', 'Tek besleme güzergâhında ek veya başlık arızası'],
          'fleet': ['Tüm güç zinciri', 'Sahalar genelinde varlık durumunun tek bir görünümünün olmaması'] },
        'airports': {
          'power-transformer': ['Giriş trafo merkezi trafoları', 'Ana beslemenin kaybına yol açan iç arıza'],
          'hv-cable': ['YG besleme kabloları', 'Besleme güzergâhlarında ek ve başlık arızası'],
          'distribution-transformer': ['Terminal ve pist dağıtım trafoları', 'Çok sayıda ünitede yağ yaşlanması ve nem'],
          'busbar': ['Hassas sistemlerin beslemesi', 'Elektronik yükleri etkileyen gerilim çukurları ve harmonikler'] },
        'distribution-utilities': {
          'power-transformer': ['Ana indirici merkezlerdeki güç trafoları', 'Gelişmekte olan iç arıza; uzun temin süresi'],
          'mv-feeder': ['OG havai hat fiderleri', 'Uzun arıza yeri bulma süreleri; iletken kopması'],
          'hv-cable': ['YG kablo hatları', 'Ek ve başlık arızası'],
          'distribution-transformer': ['Dağıtım trafoları', 'Geniş bir popülasyonda yağ yaşlanması ve nem'],
          'busbar': ['Besleme noktaları ve tüm filo', 'Tedarik kalitesi yükümlülükleri; yatırımın önceliklendirilmesi'],
          'fleet': ['Besleme noktaları ve tüm filo', 'Tedarik kalitesi yükümlülükleri; yatırımın önceliklendirilmesi'] }
      }
    }
  }[LANG];

  var uid = 0;
  function glyph(id) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + GLYPHS[id] + '</svg>';
  }

  mount('power-chain', function (el) {
    var U = DATA.ui, n = ++uid, pre = 'vzpc' + n + '-';
    var rootHref = el.getAttribute('data-root') || '';
    var locked = el.getAttribute('data-sector'); if (!DATA.sec[locked]) locked = null;
    var sector = locked || 'all';
    var sel = el.getAttribute('data-select'); if (ORDER.indexOf(sel) < 0) sel = null;

    var root = htmlEl('div', 'vz-pc');
    var top = htmlEl('div', 'vz-pc-top', root), segBtns = {};
    if (!locked) {
      var seg = htmlEl('div', 'vz-seg', top); seg.setAttribute('role', 'group'); seg.setAttribute('aria-label', U.sector);
      ['all', 'data-centers', 'airports', 'distribution-utilities'].forEach(function (k) {
        var b = htmlEl('button', 'vz-seg-btn', seg, k === 'all' ? U.all : DATA.sectors[k]); b.type = 'button';
        b.addEventListener('click', function () { setSector(k); }); segBtns[k] = b;
      });
    } else { htmlEl('span', 'vz-tag vz-tag-on', top, DATA.sectors[locked]); }
    htmlEl('span', 'vz-tag', top, U.ill);

    var diagram = htmlEl('div', 'vz-pc-diagram', root);
    var chain = htmlEl('div', 'vz-pc-chain', diagram);
    chain.setAttribute('role', 'tablist'); chain.setAttribute('aria-label', U.chain);
    var line = htmlEl('span', 'vz-pc-line', chain); line.setAttribute('aria-hidden', 'true'); htmlEl('span', 'vz-pc-pulse', line);
    var src = htmlEl('div', 'vz-pc-node vz-pc-src', chain);
    htmlEl('span', 'vz-pc-glyph', src).innerHTML = glyph('grid');
    var st = htmlEl('span', 'vz-pc-text', src); htmlEl('span', 'vz-pc-idx', st, '00'); htmlEl('span', 'vz-pc-name', st, U.grid);

    var tabs = {};
    function makeTab(id, parent) {
      var a = DATA.assets[id], i = ORDER.indexOf(id);
      var b = htmlEl('button', 'vz-pc-node', parent); b.type = 'button'; b.id = pre + 'tab-' + id;
      b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', pre + 'panel'); b.setAttribute('aria-selected', 'false'); b.tabIndex = -1;
      htmlEl('span', 'vz-pc-glyph', b).innerHTML = glyph(id);
      var t = htmlEl('span', 'vz-pc-text', b); htmlEl('span', 'vz-pc-idx', t, '0' + (i + 1)); htmlEl('span', 'vz-pc-name', t, a.s);
      b.addEventListener('click', function () { select(id, false); });
      tabs[id] = b; return b;
    }
    ORDER.slice(0, 7).forEach(function (id) { makeTab(id, chain); });
    var fleet = htmlEl('div', 'vz-pc-fleet', diagram);
    htmlEl('span', 'vz-pc-bracket', fleet).setAttribute('aria-hidden', 'true');
    /* the fleet tab belongs to the same tablist for assistive tech */
    chain.setAttribute('aria-owns', pre + 'tab-fleet');
    makeTab('fleet', fleet);

    var panel = htmlEl('div', 'vz-pc-panel', root); panel.id = pre + 'panel'; panel.setAttribute('role', 'tabpanel'); panel.tabIndex = 0;

    function relevant(id) { return sector === 'all' || !!DATA.sec[sector][id]; }
    function field(dl, label, value, cls) { var d = htmlEl('div', 'vz-pc-field' + (cls ? ' ' + cls : ''), dl); htmlEl('dt', null, d, label); htmlEl('dd', null, d, value); }
    function render() {
      var a = DATA.assets[sel], s = sector !== 'all' && DATA.sec[sector][sel];
      while (panel.firstChild) panel.removeChild(panel.firstChild);
      panel.setAttribute('aria-labelledby', pre + 'tab-' + sel);
      var hd = htmlEl('div', 'vz-pc-phead', panel);
      htmlEl('span', 'vz-pc-pidx', hd, '0' + (ORDER.indexOf(sel) + 1) + ' ' + U.of + ' 0' + ORDER.length);
      var h = htmlEl('h3', 'vz-pc-ptitle', hd, a.n);
      if (s) { var p = htmlEl('p', 'vz-pc-psector', hd); htmlEl('span', null, p, DATA.sectors[sector]); p.appendChild(D.createTextNode(' — ' + s[0])); }
      var dl = htmlEl('dl', 'vz-pc-fields', panel);
      field(dl, s ? U.f1s : U.f1, s ? s[1] : a.fail, 'is-risk');
      field(dl, U.f2, a.diff); field(dl, U.f3, a.method); field(dl, U.f4, a.product, 'is-product');
      var lk = htmlEl('div', 'vz-pc-links', panel); htmlEl('span', 'vz-pc-llabel', lk, U.tech);
      TECH_OF[sel].forEach(function (slug) {
        var l = htmlEl('a', 'vz-pc-link', lk); l.href = rootHref + slug + '.html';
        htmlEl('span', null, l, DATA.tech[slug]);
        l.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16M14 6l6 6-6 6"/></svg>');
      });
      return h;
    }
    function select(id, focus) {
      sel = id;
      ORDER.forEach(function (k) {
        var on = k === id; tabs[k].setAttribute('aria-selected', on ? 'true' : 'false'); tabs[k].tabIndex = on ? 0 : -1;
        if (relevant(k)) tabs[k].removeAttribute('data-off'); else tabs[k].setAttribute('data-off', '');
      });
      if (focus) tabs[id].focus();
      render();
      root.setAttribute('data-selected', id);
    }
    function setSector(k) {
      sector = k; root.setAttribute('data-sector', k);
      for (var s in segBtns) segBtns[s].setAttribute('aria-pressed', s === k ? 'true' : 'false');
      if (!relevant(sel)) { for (var i = 0; i < ORDER.length; i++) if (relevant(ORDER[i])) { sel = ORDER[i]; break; } }
      select(sel, false);
    }
    diagram.addEventListener('keydown', function (e) {
      if (!e.target || e.target.getAttribute('role') !== 'tab') return;
      var i = ORDER.indexOf(sel), k = e.key, to = -1;
      if (k === 'ArrowRight' || k === 'ArrowDown') to = (i + 1) % ORDER.length;
      else if (k === 'ArrowLeft' || k === 'ArrowUp') to = (i - 1 + ORDER.length) % ORDER.length;
      else if (k === 'Home') to = 0; else if (k === 'End') to = ORDER.length - 1;
      if (to < 0) return;
      e.preventDefault(); select(ORDER[to], true);
    });

    if (!sel) sel = 'power-transformer';
    setSector(sector);
    /* swap in only after everything above succeeded: the fallback list stays if init throws */
    while (el.firstChild) el.removeChild(el.firstChild);
    el.appendChild(root);
    onResize(el, function (w) { root.setAttribute('data-layout', w < 760 ? 'v' : 'h'); chain.setAttribute('aria-orientation', w < 760 ? 'vertical' : 'horizontal'); });
  });
})();
