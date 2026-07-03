type DemoRequestBody = {
  fullName: string;
  companyName: string;
  email: string;
  whatsapp: string;
  country: string;
  role: string;
  productInterest: string;
  painPoint: string;
  contactMethod: string;
  bestTime: string;
};

function formatEmailText(data: DemoRequestBody): string {
  return [
    'New demo request from gnanova.pro',
    '',
    `Full Name: ${data.fullName}`,
    `Company: ${data.companyName}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    `Country: ${data.country}`,
    `Role: ${data.role}`,
    `Product Interest: ${data.productInterest}`,
    `Pain Point: ${data.painPoint}`,
    `Preferred Contact: ${data.contactMethod}`,
    `Best Time: ${data.bestTime}`,
  ].join('\n');
}

export default async function handler(
  req: { method?: string; body?: DemoRequestBody },
  res: { status: (code: number) => { json: (body: unknown) => void; end: () => void } }
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body;

  if (!data?.fullName || !data?.email || !data?.companyName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const text = formatEmailText(data);
  const subject = `Demo Request: ${data.fullName} — ${data.companyName}`;

  if (process.env.RESEND_API_KEY) {
    const from = process.env.RESEND_FROM || 'Gnanova <onboarding@resend.dev>';
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: 'manasa@gnanova.pro',
        subject,
        text,
      }),
    });

    if (!emailRes.ok) {
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  }

  const formRes = await fetch('https://formsubmit.co/ajax/manasa@gnanova.pro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      ...data,
    }),
  });

  if (!formRes.ok) {
    return res.status(500).json({ error: 'Failed to submit' });
  }

  return res.status(200).json({ success: true });
}
