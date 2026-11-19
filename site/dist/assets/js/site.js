/* Glinker Group — core behaviours. No dependencies. Everything is an enhancement:
   content is in the HTML and readable without this file. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };

  /* ---------- mobile nav */
  var toggle = $('[data-nav-toggle]'), nav = $('#site-nav');
  var mqMobile = window.matchMedia('(max-width: 1099.98px)');
  function setNav(open) {
    root.classList.toggle('nav-open', open);
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', String(open));
    var label = $('.nav-toggle__label', toggle);
    if (label) label.textContent = open ? label.dataset.close : label.dataset.open;
  }
  if (toggle && nav) {
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function (e) { e.preventDefault(); setNav(!root.classList.contains('nav-open')); });
    toggle.addEventListener('keydown', function (e) { if (e.key === ' ') { e.preventDefault(); toggle.click(); } });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    mqMobile.addEventListener('change', function () { setNav(false); closeMegas(); });
  }

  /* ---------- mega menu (disclosure pattern) */
  var megas = $$('[data-mega]');
  function setMega(item, open) {
    item.classList.toggle('is-open', open);
    var b = $('.nav__mega-toggle', item);
    if (b) b.setAttribute('aria-expanded', String(open));
  }
  function closeMegas(except) { megas.forEach(function (m) { if (m !== except) setMega(m, false); }); }
  megas.forEach(function (item) {
    var btn = $('.nav__mega-toggle', item), timer;
    btn.addEventListener('click', function () { var o = !item.classList.contains('is-open'); closeMegas(item); setMega(item, o); });
    item.addEventListener('mouseenter', function () { if (mqMobile.matches) return; clearTimeout(timer); timer = setTimeout(function () { setMega(item, true); }, 90); });
    item.addEventListener('mouseleave', function () { if (mqMobile.matches) return; clearTimeout(timer); timer = setTimeout(function () { setMega(item, false); }, 220); });
    item.addEventListener('focusout', function (e) { if (!mqMobile.matches && !item.contains(e.relatedTarget)) setMega(item, false); });
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = megas.filter(function (m) { return m.classList.contains('is-open'); })[0];
    if (open && !mqMobile.matches) { setMega(open, false); $('.nav__mega-toggle', open).focus(); }
    else if (root.classList.contains('nav-open')) { setNav(false); toggle.focus(); }
  });
  doc.addEventListener('click', function (e) { if (!mqMobile.matches && !e.target.closest('[data-mega]')) closeMegas(); });

  /* ---------- current page link (exact match) */
  var here = (location.pathname.split('/').pop() || 'index.html');
  $$('.site-header a[href], .site-footer a[href]').forEach(function (a) {
    var h = a.getAttribute('href');
    if (h === here && !a.classList.contains('brand') && !a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'page');
  });

  /* ---------- reveal on scroll */
  $$('[data-reveal-group]').forEach(function (g) { $$(':scope > *', g).forEach(function (el, i) { el.style.setProperty('--i', i); }); });
  var revealEls = $$('[data-reveal], [data-reveal-group], .sec-head');
  var sections = $$('main > section');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- number tick-up: <span data-count="81">81</span> */
  function tick(el) {
    var end = parseFloat(el.dataset.count), t0 = null, dur = 1400;
    if (reduce || isNaN(end)) return;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * e);
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { tick(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach(function (el) { cio.observe(el); });
  }

  /* ---------- the line: per-section progress + header tone + pagenav spy */
  var header = $('.site-header');
  var darkEls = $$('.is-dark').filter(function (el) { return !el.closest('.site-header') && (el.parentNode === $('main') || el.classList.contains('site-footer')); });
  var spyLinks = $$('.pagenav a[href^="#"]');
  var spyTargets = spyLinks.map(function (a) { return doc.getElementById(a.getAttribute('href').slice(1)); });
  var ticking = false;
  function onScroll() {
    ticking = false;
    var vh = window.innerHeight, head = vh * 0.62;
    sections.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) { if (r.bottom < 0) s.style.setProperty('--lp', 1); return; }
      var p = Math.max(0, Math.min(1, (head - r.top) / r.height));
      s.style.setProperty('--lp', reduce ? 1 : p.toFixed(4));
    });
    if (header) {
      var y = header.offsetHeight + 1, tone = 'light';
      for (var i = 0; i < darkEls.length; i++) {
        var d = darkEls[i].getBoundingClientRect();
        if (d.top <= y && d.bottom > y) { tone = 'dark'; break; }
      }
      if (header.getAttribute('data-tone') !== tone) header.setAttribute('data-tone', tone);
    }
    if (spyLinks.length) {
      var cur = -1;
      spyTargets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top < vh * 0.35) cur = i; });
      spyLinks.forEach(function (a, i) { a.classList.toggle('is-active', i === cur); });
    }
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  onScroll();

  /* ---------- tabs: .tabs > .tabs__list a.tabs__tab[href="#id"] + .tabs__panel#id */
  $$('.tabs').forEach(function (tabs) {
    var list = $('.tabs__list', tabs), tabEls = $$('.tabs__tab', tabs);
    var panels = tabEls.map(function (t) { return doc.getElementById(t.getAttribute('href').slice(1)); });
    if (!list || !tabEls.length) return;
    list.setAttribute('role', 'tablist');
    function select(i, focus) {
      tabEls.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (panels[j]) panels[j].hidden = !on;
      });
      if (focus) tabEls[i].focus();
    }
    tabEls.forEach(function (t, i) {
      t.setAttribute('role', 'tab');
      if (panels[i]) { panels[i].setAttribute('role', 'tabpanel'); panels[i].setAttribute('aria-labelledby', t.id || (t.id = panels[i].id + '-tab')); t.setAttribute('aria-controls', panels[i].id); }
      t.addEventListener('click', function (e) { e.preventDefault(); select(i); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabEls.length - 1 : null;
        if (n === null) return;
        e.preventDefault(); select((n + tabEls.length) % tabEls.length, true);
      });
    });
    var start = Math.max(0, panels.findIndex(function (p) { return p && '#' + p.id === location.hash; }));
    select(start);
  });

  /* ---------- segmented buttons: .seg > button[aria-pressed] (single choice) */
  $$('.seg').forEach(function (seg) {
    var btns = $$(':scope > button', seg);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        seg.dispatchEvent(new CustomEvent('seg:change', { bubbles: true, detail: { value: b.value || b.dataset.value } }));
      });
    });
  });

  /* ---------- contact form: <form data-contact-form data-mailto="…">
     Optional hooks (contact page; the kit markup works without them):
     form[data-subject-template="… {topic} … {organization}"] [data-signature] [data-hide-on-send]
     input[data-order] orders the e-mail lines · radio[data-help] -> [data-topic-help]
     textarea[data-max] + [data-charcount] · .field__error[data-missing|data-invalid|data-long]
     status: [data-mailto-link] [data-mail-text] button[data-copy="text|address"] [data-copy-toast] [data-form-edit] */
  var form = $('[data-contact-form]');
  if (form) {
    var addr = form.dataset.mailto || 'koordinasyon@glinkergroup.com';
    var fStatus = $('[data-form-status]');
    var radios = $$('input[name="topic"]', form);
    var helpEl = $('[data-topic-help]', form);
    var helpDefault = helpEl ? helpEl.textContent : '';
    var submitBtn = $('button[type="submit"]', form);
    var mailText = '';
    var topic = new URLSearchParams(location.search).get('topic');
    if (topic) {
      var r = form.querySelector('input[name="topic"][value="' + topic.replace(/[^a-z-]/g, '') + '"]');
      if (r) r.checked = true;
    }
    var syncHelp = function () {
      var c = radios.filter(function (x) { return x.checked; })[0];
      if (helpEl) helpEl.textContent = c && c.dataset.help ? c.dataset.help : helpDefault;
    };
    var syncCount = function () {
      $$('textarea[data-max]', form).forEach(function (t) {
        var out = t.id && $('[data-charcount="' + t.id + '"]', form), max = +t.dataset.max;
        if (out) { out.textContent = t.value.length + ' / ' + max; out.classList.toggle('is-over', t.value.length > max); }
      });
    };
    var check = function (f) {
      var input = $('input:not([type=radio]), textarea, select', f), group = !input && $$('input[type=radio]', f);
      if (group && group.length) input = group[0];
      if (!input) return null;
      if (input.dataset.max) input.setCustomValidity(input.value.length > +input.dataset.max ? 'too long' : '');
      var bad = !input.checkValidity(), err = $('.field__error', f);
      if (bad && err) {
        var v = input.validity;
        var t = v.valueMissing ? err.dataset.missing : v.customError ? err.dataset.long : err.dataset.invalid;
        if (t) err.textContent = t;
      }
      f.classList.toggle('is-invalid', bad);
      f.classList.toggle('is-valid', !bad && input.type !== 'radio' && input.value.trim() !== '');
      (group || [input]).forEach(function (x) { x.setAttribute('aria-invalid', String(bad)); });
      return bad ? input : null;
    };
    var compose = function () {
      var vals = {}, lines = [], blocks = [];
      $$('input, textarea, select', form).forEach(function (el, i) {
        if (!el.name || ((el.type === 'radio' || el.type === 'checkbox') && !el.checked)) return;
        var v = el.value.trim();
        if (el.type === 'radio') v = el.dataset.text || v;
        vals[el.name] = v;
        if (!v) return;
        var label = el.dataset.label || el.name;
        if (el.tagName === 'TEXTAREA') blocks.push('', label + ':', v);
        else lines.push({ o: el.dataset.order ? +el.dataset.order : 100 + i, t: label + ': ' + v });
      });
      lines.sort(function (a, b) { return a.o - b.o; });
      var subject, tpl = form.dataset.subjectTemplate;
      if (tpl) subject = tpl.replace(/\{(\w+)\}/g, function (m, k) { return vals[k] || ''; }).replace(/\s*[—–-]\s*$/, '');
      else subject = (form.dataset.subject || 'Website request') + (vals.topic ? ' — ' + vals.topic : '');
      var body = lines.map(function (l) { return l.t; }).concat(blocks);
      if (form.dataset.signature) body.push('', '—', form.dataset.signature);
      return { subject: subject, body: body };
    };
    var copyText = function (text, done) {
      var fallback = function () {
        var ta = doc.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        doc.body.appendChild(ta); ta.select();
        try { if (doc.execCommand('copy')) done(); } catch (e) { /* ignore */ }
        ta.remove();
      };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    };
    form.setAttribute('novalidate', '');
    radios.forEach(function (x) { x.addEventListener('change', function () { syncHelp(); if (form.classList.contains('was-validated')) check(x.closest('.field')); }); });
    form.addEventListener('input', function (e) {
      syncCount();
      var f = e.target.closest('.field');
      if (f && (f.classList.contains('is-invalid') || f.classList.contains('is-valid'))) check(f);
    });
    form.addEventListener('focusout', function (e) {
      var f = e.target.closest('.field');
      if (f && e.target.type !== 'radio' && (e.target.value.trim() || form.classList.contains('was-validated'))) check(f);
    });
    form.addEventListener('reset', function () {
      setTimeout(function () {
        $$('.field', form).forEach(function (f) { f.classList.remove('is-invalid', 'is-valid'); });
        $$('[aria-invalid]', form).forEach(function (x) { x.removeAttribute('aria-invalid'); });
        form.classList.remove('was-validated');
        var a = $('[data-form-alert]', form); if (a) a.hidden = true;
        syncHelp(); syncCount();
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('was-validated');
      var first = null;
      $$('.field', form).forEach(function (f) { var bad = check(f); first = first || bad; });
      var alertEl = $('[data-form-alert]', form);
      if (alertEl) alertEl.hidden = !first;
      if (first) { first.focus(); return; }
      var m = compose();
      var href = 'mailto:' + addr + '?subject=' + encodeURIComponent(m.subject) + '&body=' + encodeURIComponent(m.body.join('\r\n'));
      mailText = 'To: ' + addr + '\nSubject: ' + m.subject + '\n\n' + m.body.join('\n');
      if (submitBtn && submitBtn.dataset.busy) {
        var label = $('[data-btn-label]', submitBtn) || submitBtn, idle = label.textContent;
        label.textContent = submitBtn.dataset.busy; submitBtn.disabled = true;
        setTimeout(function () { label.textContent = idle; submitBtn.disabled = false; }, 1200);
      }
      if (fStatus) {
        $$('[data-mailto-link]', fStatus).forEach(function (a) { a.href = href; });
        var pre = $('[data-mail-text]', fStatus);
        if (pre) pre.textContent = mailText;
        if (form.hasAttribute('data-hide-on-send')) form.hidden = true;
        fStatus.hidden = false; fStatus.tabIndex = -1; fStatus.focus();
      }
      window.location.href = href;
    });
    if (fStatus) {
      fStatus.addEventListener('click', function (e) {
        var b = e.target.closest('[data-copy], [data-form-edit]');
        if (!b) return;
        if (b.hasAttribute('data-form-edit')) {
          fStatus.hidden = true; form.hidden = false;
          var c = radios.filter(function (x) { return x.checked; })[0] || $('input, textarea', form);
          if (c) c.focus();
          return;
        }
        var toast = $('[data-copy-toast]', fStatus);
        copyText(b.dataset.copy === 'address' ? addr : mailText, function () {
          if (!toast) return;
          toast.textContent = toast.dataset.text || 'Copied.';
          clearTimeout(toast._t); toast._t = setTimeout(function () { toast.textContent = ''; }, 2600);
        });
      });
    }
    syncHelp(); syncCount();
  }
})();

