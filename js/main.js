/* =========================================================================
   NCO Lifestyle Travel — site behaviour
   ========================================================================= */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '2348100601817';

  /* ---------- Sticky header ---------- */
  var header = document.getElementById('siteHeader');
  var toTop = document.getElementById('toTop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-solid', y > 40);
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  var overlay = document.getElementById('navOverlay');

  function setMenu(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (overlay) {
      overlay.hidden = false;
      overlay.classList.toggle('is-open', open);
    }
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
  }
  if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 940) setMenu(false);
  });

  /* ---------- Active nav link ---------- */
  var page = (location.pathname.split('/').pop() || 'index.html');
  if (page === '' ) page = 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === page) {
      document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('is-active'); });
      link.classList.add('is-active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Close siblings for a clean single-open accordion
      item.parentElement.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
          openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
    });
  });

  /* ---------- Enquiry form → WhatsApp ---------- */
  var form = document.getElementById('enquiryForm');
  if (form) {
    var success = document.getElementById('formSuccess');

    function setError(field, hasError) {
      field.classList.toggle('has-error', hasError);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#fName');
      var phone = form.querySelector('#fPhone');
      var email = form.querySelector('#fEmail');
      var service = form.querySelector('#fService');
      var dest = form.querySelector('#fDest');
      var msg = form.querySelector('#fMsg');
      var ok = true;

      // Required checks
      [[name, name.value.trim().length > 1],
       [phone, phone.value.replace(/\D/g, '').length >= 7],
       [service, service.value !== ''],
       [msg, msg.value.trim().length > 4]
      ].forEach(function (pair) {
        var valid = pair[1];
        setError(pair[0].closest('.field'), !valid);
        if (!valid) ok = false;
      });

      // Optional email format check (only if filled in)
      if (email.value.trim() !== '') {
        var validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
        setError(email.closest('.field'), !validEmail);
        if (!validEmail) ok = false;
      }

      if (!ok) {
        var firstErr = form.querySelector('.field.has-error input, .field.has-error select, .field.has-error textarea');
        if (firstErr) firstErr.focus();
        return;
      }

      // Build the message
      var lines = [
        'Hello NCO Lifestyle Travel!',
        '',
        'Name: ' + name.value.trim(),
        'Phone: ' + phone.value.trim()
      ];
      if (email.value.trim()) lines.push('Email: ' + email.value.trim());
      lines.push('Service: ' + service.value);
      if (dest.value.trim()) lines.push('Destination/Dates: ' + dest.value.trim());
      lines.push('Message: ' + msg.value.trim());

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');

      if (success) {
        success.classList.add('show');
        setTimeout(function () { success.classList.remove('show'); }, 8000);
      }
      form.reset();
    });

    // Clear error state while typing
    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field) field.classList.remove('has-error');
    });
  }

  /* ---------- Back to top ---------- */
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Smooth anchor scrolling (offset for fixed header) ---------- */
  document.querySelectorAll('a[href*="#"]').forEach(function (anchor) {
    var href = anchor.getAttribute('href');
    if (!href || href === '#' || href.indexOf('.html#') !== -1) return;
    var id = href.split('#')[1];
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();
