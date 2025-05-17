document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const toggleBtn = document.getElementById('dark-mode-toggle');

  // Form submission and validation
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showAlert('Please fill in all fields.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    showAlert('Message sent successfully!', 'success');
    form.reset();
  });

  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('form-alert', type);
    alertDiv.textContent = message;
    form.prepend(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  // Dark mode toggle
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');

      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = '☀️';
      } else {
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = '🌙';
      }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      toggleBtn.textContent = '☀️';
    }
  }
});
