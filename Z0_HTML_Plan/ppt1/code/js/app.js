// js/app.js — small interactive examples using DOM & events
// Variables and simple DOM helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Profile card interaction (page example)
const contactBtn = $('#contactBtn');
if (contactBtn) {
  contactBtn.addEventListener('click', function (e) {
    e.preventDefault();
    alert('This would open a contact form or mailto: link. (Example of event handling)');
  });
}

// Simple form validation demo (uses HTML5 + extra checks)
const simpleForm = $('#simpleForm');
const formMsg = $('#formMsg');
if (simpleForm) {
  simpleForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formMsg.textContent = '';
    const email = $('#email');
    const pass = $('#pass');

    if (!email.checkValidity()) {
      formMsg.textContent = 'Please provide a valid email.';
      formMsg.style.color = 'crimson';
      return;
    }
    if (!pass.checkValidity()) {
      formMsg.textContent = 'Password must be at least 6 characters.';
      formMsg.style.color = 'crimson';
      return;
    }

    // Simulate success
    formMsg.textContent = 'Form submitted successfully — this is simulated.';
    formMsg.style.color = 'green';
    simpleForm.reset();
  });
}

// Counter app example (practical app on page 34-35 of PDF)
let count = 0;
const countEl = $('#count');
const inc = $('#inc');
const dec = $('#dec');
const reset = $('#reset');

function renderCount() {
  if (countEl) countEl.textContent = count;
}

if (inc) inc.addEventListener('click', () => { count += 1; renderCount(); });
if (dec) dec.addEventListener('click', () => { count = Math.max(0, count - 1); renderCount(); });
if (reset) reset.addEventListener('click', () => { count = 0; renderCount(); });

// Initialize
renderCount();
