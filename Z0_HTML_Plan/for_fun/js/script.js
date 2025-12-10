(function () {
  const form = document.getElementById('regForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');

  function showMessage(msg, isError) {
    formMessage.textContent = msg;
    formMessage.className = isError ? 'msg error' : 'msg success';
  }

  function validatePasswordMatch() {
    const pwd = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    if (pwd.value !== confirm.value) {
      confirm.setCustomValidity('Passwords do not match.');
      return false;
    } else {
      confirm.setCustomValidity('');
      return true;
    }
  }

  // Live password checking
  document.getElementById('password').addEventListener('input', validatePasswordMatch);
  document.getElementById('confirmPassword').addEventListener('input', validatePasswordMatch);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    showMessage('', false);

    // Built-in HTML validation
    if (!form.checkValidity()) {
      showMessage('Please correct the highlighted fields.', true);
      form.reportValidity();
      return;
    }

    if (!validatePasswordMatch()) {
      showMessage('Passwords do not match.', true);
      return;
    }

    // Optional Phone check
    const phone = document.getElementById('phone');
    if (phone.value && !/^\d{10}$/.test(phone.value)) {
      phone.setCustomValidity('Phone must be 10 digits.');
      phone.reportValidity();
      showMessage('Phone must be 10 digits.', true);
      return;
    } else {
      phone.setCustomValidity('');
    }

    // Fake async submit
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registering...';

    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Register';
      form.reset();
      showMessage('Registration successful! A confirmation email will be sent shortly.', false);
    }, 900);
  });
})();
