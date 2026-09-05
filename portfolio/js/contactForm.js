// contactForm.js — client-side validation + submission.
//
// Sends through the Vercel serverless endpoint in /api/contact.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: { input: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { input: document.getElementById('email'), error: document.getElementById('emailError') },
    message: { input: document.getElementById('message'), error: document.getElementById('messageError') },
  };
  const status = document.getElementById('formStatus');

  function setError(field, message) {
    const { input, error } = fields[field];
    input.closest('.field').classList.toggle('has-error', Boolean(message));
    error.textContent = message || '';
  }

  function validate() {
    let valid = true;

    if (!fields.name.input.value.trim()) {
      setError('name', 'Please enter your name.');
      valid = false;
    } else {
      setError('name', '');
    }

    const emailVal = fields.email.input.value.trim();
    if (!emailVal) {
      setError('email', 'Please enter your email.');
      valid = false;
    } else if (!EMAIL_RE.test(emailVal)) {
      setError('email', 'That email address doesn\u2019t look right.');
      valid = false;
    } else {
      setError('email', '');
    }

    if (!fields.message.input.value.trim() || fields.message.input.value.trim().length < 10) {
      setError('message', 'Please write at least a short message (10+ characters).');
      valid = false;
    } else {
      setError('message', '');
    }

    return valid;
  }

  async function submitMessage() {
    const name = fields.name.input.value.trim();
    const email = fields.email.input.value.trim();
    const message = fields.message.input.value.trim();

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Could not send your message.');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) {
      status.textContent = 'Please fix the fields above and try again.';
      status.className = 'contact__form-status is-error';
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    status.textContent = 'Sending your message…';
    status.className = 'contact__form-status';

    try {
      await submitMessage();
      status.textContent = 'Message sent successfully.';
      status.className = 'contact__form-status is-success';
      form.reset();
    } catch (error) {
      status.textContent = error.message;
      status.className = 'contact__form-status is-error';
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });

  // Clear a field's error as soon as the person starts fixing it
  Object.values(fields).forEach(({ input }) => {
    input.addEventListener('input', () => {
      input.closest('.field').classList.remove('has-error');
    });
  });
}
