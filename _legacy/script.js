// ==========================================================================
// HOLIDAYS.AI — script.js
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initSmoothScroll();
  initDestinationCards();
  initLeadForm();
});

// ---------- 1. Mobile nav toggle ----------
function initNavToggle() {
  var toggle = document.querySelector('.nav-toggle');
  var actions = document.getElementById('nav-actions');
  if (!toggle || !actions) return;

  actions.setAttribute('data-open', 'false');

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    actions.setAttribute('data-open', String(!isOpen));
  });

  // Close the mobile menu after choosing a link/button inside it.
  actions.querySelectorAll('a, button').forEach(function (el) {
    el.addEventListener('click', function () {
      if (window.innerWidth < 900) {
        toggle.setAttribute('aria-expanded', 'false');
        actions.setAttribute('data-open', 'false');
      }
    });
  });
}

// ---------- 2. Smooth scroll for CTA / in-page links ----------
function initSmoothScroll() {
  document.querySelectorAll('[data-scroll-target]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var targetId = el.getAttribute('data-scroll-target');
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---------- 3. Destination cards -> open tour package popup ----------
var DESTINATION_LABELS = {
  bali: 'Bali',
  vietnam: 'Vietnam',
  laos: 'Laos',
  'sri-lanka': 'Sri Lanka'
};

var DESTINATION_PACKAGES = {
  bali: [
    { name: 'Bali Island Explorer', duration: '6 Days / 5 Nights', price: '₹58,000' },
    { name: 'Ubud & Seminyak Retreat', duration: '5 Days / 4 Nights', price: '₹52,000' },
    { name: 'Bali Honeymoon Special', duration: '7 Days / 6 Nights', price: '₹79,000' },
    { name: 'Bali with Nusa Penida', duration: '8 Days / 7 Nights', price: '₹95,000' }
  ],
  vietnam: [
    { name: 'Hanoi & Halong Bay Cruise', duration: '6 Days / 5 Nights', price: '₹65,000' },
    { name: 'Vietnam North to South', duration: '10 Days / 9 Nights', price: '₹1,18,000' },
    { name: 'Ho Chi Minh & Mekong Delta', duration: '5 Days / 4 Nights', price: '₹48,000' },
    { name: 'Da Nang & Hoi An Escape', duration: '6 Days / 5 Nights', price: '₹61,000' },
    { name: 'Sapa Trekking Adventure', duration: '4 Days / 3 Nights', price: '₹42,000' },
    { name: 'Vietnam Complete Tour', duration: '12 Days / 11 Nights', price: '₹1,42,000' }
  ],
  laos: [
    { name: 'Luang Prabang Heritage Trail', duration: '5 Days / 4 Nights', price: '₹49,000' },
    { name: 'Laos Mekong River Journey', duration: '7 Days / 6 Nights', price: '₹68,000' },
    { name: 'Vientiane & Vang Vieng', duration: '6 Days / 5 Nights', price: '₹56,000' }
  ],
  'sri-lanka': [
    { name: 'Sri Lanka Hill Country Tour', duration: '6 Days / 5 Nights', price: '₹54,000' },
    { name: 'Colombo, Kandy & Nuwara Eliya', duration: '7 Days / 6 Nights', price: '₹62,000' },
    { name: 'Southern Coast & Wildlife Safari', duration: '5 Days / 4 Nights', price: '₹47,000' },
    { name: 'Sri Lanka Complete Circuit', duration: '9 Days / 8 Nights', price: '₹89,000' },
    { name: 'Sri Lanka Honeymoon Escape', duration: '6 Days / 5 Nights', price: '₹71,000' }
  ]
};

function initDestinationCards() {
  var cards = document.querySelectorAll('.destination-card[data-destination]');
  var modal = document.getElementById('packageModal');
  if (!cards.length || !modal) return;

  var modalHeading = document.getElementById('modalDestinationName');
  var packageList = document.getElementById('packageList');
  var closeBtn = document.getElementById('modalClose');
  var lastFocusedTrigger = null;

  function renderPackages(destinationKey) {
    var packages = DESTINATION_PACKAGES[destinationKey] || [];
    packageList.innerHTML = '';

    packages.forEach(function (pkg) {
      var item = document.createElement('div');
      item.className = 'package-item';

      var info = document.createElement('div');
      info.className = 'package-info';
      info.innerHTML =
        '<h3>' + pkg.name + '</h3>' +
        '<p class="package-duration">' + pkg.duration + '</p>' +
        '<p class="package-price">' + pkg.price + ' <span>per person</span></p>';

      var cta = document.createElement('button');
      cta.type = 'button';
      cta.className = 'btn btn-primary package-cta';
      cta.textContent = 'Know Details';
      cta.addEventListener('click', function () {
        goToLeadForm(destinationKey);
      });

      item.appendChild(info);
      item.appendChild(cta);
      packageList.appendChild(item);
    });
  }

  function goToLeadForm(destinationKey) {
    var destinationSelect = document.getElementById('lf-destination');
    var leadForm = document.getElementById('lead-form');
    var optionExists = Array.prototype.some.call(destinationSelect.options, function (opt) {
      return opt.value === destinationKey;
    });
    if (optionExists) destinationSelect.value = destinationKey;
    closeModal();
    leadForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function openModal(destinationKey, trigger) {
    lastFocusedTrigger = trigger;
    modalHeading.textContent = DESTINATION_LABELS[destinationKey] || destinationKey;
    renderPackages(destinationKey);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-card').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedTrigger) lastFocusedTrigger.focus();
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card.getAttribute('data-destination'), card);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
}

// ---------- 4. Lead generation form: validation + submission ----------
function initLeadForm() {
  var form = document.getElementById('leadForm');
  var successState = document.getElementById('leadSuccess');
  var errorBanner = document.getElementById('leadErrorBanner');
  var submitBtn = document.getElementById('leadSubmit');
  if (!form) return;

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var fields = [
    { id: 'lf-name', errorId: 'err-name', validate: validateRequired, message: 'Please enter your name.' },
    { id: 'lf-email', errorId: 'err-email', validate: validateEmail, message: 'Please enter a valid email address.' },
    { id: 'lf-phone', errorId: 'err-phone', validate: validatePhone, message: 'Please enter a valid phone number (at least 10 digits).' },
    { id: 'lf-destination', errorId: 'err-destination', validate: validateRequired, message: 'Please choose a destination.' },
    { id: 'lf-travellers', errorId: 'err-travellers', validate: validateRequired, message: 'Please select the number of travellers.' },
    { id: 'lf-budget', errorId: 'err-budget', validate: validateRequired, message: 'Please select a budget.' }
  ];

  function validateRequired(value) {
    return value.trim().length > 0;
  }

  function validateEmail(value) {
    return EMAIL_PATTERN.test(value.trim());
  }

  function validatePhone(value) {
    var digits = value.replace(/\D/g, '');
    return digits.length >= 10;
  }

  function setFieldError(field, message) {
    var input = document.getElementById(field.id);
    var errorEl = document.getElementById(field.errorId);
    var row = input.closest('.form-row');
    if (message) {
      row.classList.add('has-error');
      errorEl.textContent = message;
    } else {
      row.classList.remove('has-error');
      errorEl.textContent = '';
    }
  }

  function validateForm() {
    var isValid = true;
    var firstInvalidInput = null;

    fields.forEach(function (field) {
      var input = document.getElementById(field.id);
      var valid = field.validate(input.value);
      setFieldError(field, valid ? '' : field.message);
      if (!valid) {
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = input;
      }
    });

    if (firstInvalidInput) firstInvalidInput.focus();
    return isValid;
  }

  // Clear a field's error as soon as the user fixes it.
  fields.forEach(function (field) {
    var input = document.getElementById(field.id);
    input.addEventListener('input', function () {
      if (field.validate(input.value)) setFieldError(field, '');
    });
    input.addEventListener('change', function () {
      if (field.validate(input.value)) setFieldError(field, '');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorBanner.hidden = true;

    if (!validateForm()) return;

    var payload = {
      name: document.getElementById('lf-name').value.trim(),
      email: document.getElementById('lf-email').value.trim(),
      phone: '+91' + document.getElementById('lf-phone').value.replace(/\D/g, ''),
      destination: document.getElementById('lf-destination').value,
      travellers: document.getElementById('lf-travellers').value,
      budget: document.getElementById('lf-budget').value
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Request failed with status ' + response.status);
        showSuccess();
      })
      .catch(function () {
        showError();
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get My Personalized Plan';
      });
  });

  function showSuccess() {
    form.hidden = true;
    successState.hidden = false;
  }

  function showError() {
    errorBanner.hidden = false;
  }
}
