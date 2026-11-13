document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('regForm');
  const submitBtn = document.getElementById('regSubmit');
  const walletBtn = document.getElementById('walletConnect');
  const status = document.getElementById('reg-status');

  const nameInput = document.getElementById('reg-name');
  const emailInput = document.getElementById('reg-email');
  const passwordInput = document.getElementById('reg-password');
  const confirmInput = document.getElementById('reg-confirm');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('reg-email-error');
  const passError = document.getElementById('reg-password-error');
  const confirmError = document.getElementById('reg-confirm-error');

  // Password toggles
  form.querySelectorAll('.password-toggle').forEach((toggle, idx) => {
    const icon = toggle.querySelector('i');
    const target = idx === 0 ? passwordInput : confirmInput;
    toggle.addEventListener('click', () => {
      const isPassword = target.type === 'password';
      target.type = isPassword ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', !isPassword);
      icon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    });
  });

  const validators = {
    name: (v) => v.trim().length > 1,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || /^0x[a-fA-F0-9]{40}$/.test(v.trim()),
    password: (v) => v.trim().length >= 6,
    confirm: (v) => v.trim().length > 0 && v === passwordInput.value,
  };

  const fields = [
    {
      input: nameInput,
      error: nameError,
      validator: validators.name,
      msg: 'Please enter your full name.',
    },
    {
      input: emailInput,
      error: emailError,
      validator: validators.email,
      msg: 'Please enter a valid email address.',
    },
    {
      input: passwordInput,
      error: passError,
      validator: validators.password,
      msg: 'Password must be at least 6 characters.',
    },
    {
      input: confirmInput,
      error: confirmError,
      validator: validators.confirm,
      msg: 'Passwords do not match.',
    },
  ];

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

  fields.forEach((f) => {
    f.input.addEventListener('blur', () => {
      if (!f.validator(f.input.value)) setError(f.input, f.error, f.msg);
      else clearError(f.input, f.error);
    });
    f.input.addEventListener('input', () => {
      if (f.input.classList.contains('error') && f.validator(f.input.value)) {
        clearError(f.input, f.error);
      }
    });
  });

  // Wallet connect (demo)
  walletBtn.addEventListener('click', () => {
    const original = walletBtn.innerText;
    walletBtn.innerText = 'Connecting...';
    walletBtn.disabled = true;
    setTimeout(() => {
      walletBtn.innerText = 'Wallet Connected';
      walletBtn.style.background = '#00ffc6';
      walletBtn.style.color = '#07121a';
      setTimeout(() => {
        walletBtn.innerText = original;
        walletBtn.disabled = false;
        walletBtn.style.background = '';
        walletBtn.style.color = '';
      }, 2000);
    }, 1000);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach((f) => {
      if (!f.validator(f.input.value)) {
        setError(f.input, f.error, f.msg);
        isValid = false;
      } else {
        clearError(f.input, f.error);
      }
    });

    if (!isValid) {
      status.textContent = 'Please fix the highlighted fields and try again.';
      status.className = 'form-status error';
      return;
    }

    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Creating account...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
      status.textContent = 'Demo registration complete (frontend only).';
      status.className = 'form-status';
      setTimeout(() => {
        status.textContent = '';
      }, 3000);
    }, 1200);
  });
});
