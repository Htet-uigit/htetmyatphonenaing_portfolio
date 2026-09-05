const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, message } = request.body || {};
  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim();
  const cleanMessage = String(message || '').trim();

  if (!cleanName || !EMAIL_RE.test(cleanEmail) || cleanMessage.length < 10) {
    return response.status(400).json({ error: 'Please provide a valid name, email, and message.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    return response.status(500).json({ error: 'Contact delivery is not configured yet.' });
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL],
      reply_to: cleanEmail,
      subject: `Portfolio contact from ${cleanName}`,
      text: `${cleanMessage}\n\nFrom: ${cleanName} (${cleanEmail})`,
    }),
  });

  if (!resendResponse.ok) {
    return response.status(502).json({ error: 'The email provider could not accept the message.' });
  }

  return response.status(200).json({ ok: true });
}
