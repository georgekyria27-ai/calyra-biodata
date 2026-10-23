(function () {
  var root = document.documentElement;

  /* ---------- theme ---------- */
  var toggle = document.querySelector('[data-theme-toggle]');
  var mode = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  var sun =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.8v2.4M12 19.8v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M1.8 12h2.4M19.8 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7"/></svg>';
  var moon =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';

  function paint() {
    root.setAttribute('data-theme', mode);
    if (!toggle) return;
    toggle.innerHTML = mode === 'dark' ? sun : moon;
    toggle.setAttribute(
      'aria-label',
      'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode'
    );
  }
  paint();
  if (toggle) {
    toggle.addEventListener('click', function () {
      mode = mode === 'dark' ? 'light' : 'dark';
      paint();
    });
  }

  /* ---------- mobile nav ---------- */
  var navBtn = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('site-nav');
  if (navBtn && nav) {
    navBtn.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', open ? 'false' : 'true');
      navBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.setAttribute('data-open', 'false');
        navBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-in');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  /* ---------- contact form -> email client ---------- */
  var form = document.querySelector('form.contact');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      function v(k) {
        return (d.get(k) || '').toString().trim();
      }
      var subject =
        'Project enquiry — ' + (v('service') || 'Data analysis') +
        (v('org') ? ' — ' + v('org') : '');
      var body = [
        'Name: ' + v('name'),
        'Organisation: ' + v('org'),
        'Email: ' + v('email'),
        'Phone: ' + v('phone'),
        'Service line: ' + v('service'),
        'Target timeline: ' + v('timeline'),
        '',
        'What I need:',
        v('message'),
        '',
        '— sent from calyrabiodata.com',
      ].join('\n');
      var status = document.getElementById('form-status');
      if (status) {
        status.textContent =
          'Opening your email app with the message ready to send. If nothing opens, email georgekyriazis@calyrabiodata.com directly.';
        status.hidden = false;
      }
      window.location.href =
        'mailto:georgekyriazis@calyrabiodata.com?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body);
    });
  }

  /* ---------- footer year ---------- */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
