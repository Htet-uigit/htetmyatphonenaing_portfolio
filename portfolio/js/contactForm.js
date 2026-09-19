export function initContactForm() {
  // Initialize EmailJS with your Public Key
  emailjs.init("yjs3DX9NtuGWTkVLn");

  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    if (statusEl) {
      statusEl.style.color = '';
      statusEl.textContent = '';
    }

    // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your EmailJS IDs
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
      .then(() => {
        if (statusEl) {
          statusEl.style.color = '#4caf50'; // Success green
          statusEl.textContent = 'Message sent successfully!';
        }
        form.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        if (statusEl) {
          statusEl.style.color = '#f44336'; // Error red
          statusEl.textContent = 'Failed to send message. Please try again.';
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
        }
      });
  });
}