export function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  if (!form) return;

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      if (statusEl) {
        statusEl.textContent = '';
        statusEl.style.color = '';
      }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (statusEl) {
        statusEl.style.color = '#f44336';
        statusEl.textContent = result.error || 'Failed to send message. Please try again.';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      }
      return;
    }

    if (statusEl) {
      statusEl.style.color = '#4caf50';
      statusEl.textContent = 'Message sent successfully!';
    }

    form.reset();

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });
}