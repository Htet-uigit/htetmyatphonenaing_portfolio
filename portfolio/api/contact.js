const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  try {
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
        from: process.env.RESEND_FROM || 'Portfolio contact <onboarding@resend.dev>',
        to: [process.env.CONTACT_EMAIL],
        reply_to: cleanEmail,
        replyTo: cleanEmail,
        subject: `Portfolio contact from ${cleanName}`,
        text: `${cleanMessage}\n\nFrom: ${cleanName} (${cleanEmail})`,
      }),
    });

    if (!resendResponse.ok) {
      let errorData = {};
      try {
        errorData = await resendResponse.json();
      } catch (e) {
        // ignore
      }
      return response.status(502).json({ error: errorData.error?.message || errorData.message || 'The email provider could not accept the message.' });
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error.' });
  }
};
