export function initContactForm() {
  // Initialize EmailJS with your Public Key
  emailjs.init("yjs3DX9NtuGWTkVLn");

  const form = document.getElementById('contact-form'); // Adjust ID if different
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Send the form directly using EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
      .then(() => {
        alert('Message sent successfully!');
        form.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('Failed to send message. Please try again later.');
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
}