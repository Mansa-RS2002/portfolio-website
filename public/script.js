document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous alerts
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

    // This is where you add the emailjs.send call
    emailjs.send("service_kd7wrgp", "template_keorw27", {
      from_name: name,
      from_email: email,
      message: message
    })
    .then(() => {
      showAlert('Message sent successfully!', 'success');
      form.reset();
    }, (error) => {
      showAlert('Failed to send message, please try again.', 'error');
      console.error(error);
    });
  });

  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('form-alert', type);
    alertDiv.textContent = message;
    form.prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});
