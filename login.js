document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const status = document.getElementById('login-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  // Password toggle
  const toggle = form.querySelector('.password-toggle');
  const toggleIcon = toggle.querySelector('i');
  toggle.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', !isPassword);
    toggleIcon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
  });

  const validators = {
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || /^0x[a-fA-F0-9]{40}$/.test(v.trim()),
    password: (v) => v.trim().length > 0,
  };

  const clearError = (input, span) => {
    input.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
    span.textContent = '';
  };

  const setError = (input, span, msg) => {
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
    span.textContent = msg;
  };

  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener('blur', () => {
      const valid = validators[input.name](input.value);
      if (!valid) {
        const msgs = {
          email: 'Please enter a valid email address.',
          password: 'Please enter your password.',
        };
        setError(input, input.name === 'email' ? emailError : passwordError, msgs[input.name]);
      } else {
        clearError(input, input.name === 'email' ? emailError : passwordError);
      }
    });
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        const valid = validators[input.name](input.value);
        if (valid) clearError(input, input.name === 'email' ? emailError : passwordError);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const emailValid = validators.email(emailInput.value);
    if (!emailValid) {
      setError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    const passValid = validators.password(passwordInput.value);
    if (!passValid) {
      setError(passwordInput, passwordError, 'Please enter your password.');
      isValid = false;
    } else {
      clearError(passwordInput, passwordError);
    }

    if (!isValid) {
      status.textContent = 'Please fix the highlighted fields and try again.';
      status.className = 'form-status error';
      return;
    }

    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Signing in...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
      status.textContent = 'Demo login — credentials accepted (frontend only).';
      status.className = 'form-status';
      setTimeout(() => {
        status.textContent = '';
      }, 3000);
    }, 1200);
  });
});
