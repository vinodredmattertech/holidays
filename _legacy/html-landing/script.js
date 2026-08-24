(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- nav scroll state ---------- */
  var nav = document.getElementById('siteNav');
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- scroll reveal ---------- */
  var revealTargets = document.querySelectorAll('.reveal, .story, .deco-draw');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- stats count-up ---------- */
  var statNums = document.querySelectorAll('.stat__num');
  function parseTarget(text) {
    var match = text.match(/([\d,]+)/);
    return match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
  }
  function animateCount(el) {
    var raw = el.textContent;
    var target = parseTarget(raw);
    if (target === null || reduceMotion) return;
    var suffix = raw.replace(/^[\d,]+/, '');
    var start = performance.now();
    var duration = 1400;
    function tick(now) {
      var p = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      var value = Math.round(target * eased);
      el.textContent = value.toLocaleString('en-US') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (statNums.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      /* leave static values */
    } else {
      var statIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              statIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      statNums.forEach(function (el) { statIo.observe(el); });
    }
  }

  /* ---------- destination -> form pre-select ---------- */
  var destinationLinks = document.querySelectorAll('[data-destination]');
  var destinationSelect = document.getElementById('ef-destination');
  destinationLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var value = link.getAttribute('data-destination');
      if (destinationSelect && value) {
        destinationSelect.value = value;
        destinationSelect.classList.add('is-preselected');
      }
      var target = document.getElementById('enquiry');
      if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (destinationSelect) {
        window.setTimeout(function () { destinationSelect.focus({ preventScroll: true }); }, reduceMotion ? 0 : 650);
      }
    });
  });

  /* ---------- enquiry form submit ---------- */
  var form = document.getElementById('enquiryForm');
  var formCard = form ? form.closest('.form-card') : null;
  var formSuccess = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (formCard) formCard.classList.add('is-submitted');
      if (formSuccess) formSuccess.classList.add('is-visible');
    });
  }
})();
