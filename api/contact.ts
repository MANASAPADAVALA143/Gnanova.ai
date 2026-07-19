const CONTACT_EMAIL = 'manusmile0587@gmail.com';
const FORMSUBMIT_ID = process.env.FORMSUBMIT_ID || '44b7f96bf3a656d18d36e1622d199470';
const FORMSUBMIT_AUTORESPONSE =
  process.env.FORMSUBMIT_AUTORESPONSE ||
  "Thank you for reaching out to Gnanova AI. We've received your demo request and Manasa will get back to you within 24 hours via your preferred contact method. — Team Gnanova";

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
    `Email Address: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    `Country: ${data.country}`,
    `Role: ${data.role}`,
    `Product Interest: ${data.productInterest}`,
    `Pain Point: ${data.painPoint}`,
    `Preferred Contact: ${data.contactMethod}`,
    `Best Time: ${data.bestTime}`,
  ].join('\n');
}

/** Normalize to E.164-ish digits with leading + for Twilio WhatsApp. */
function normalizeWhatsAppTo(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, '');
  if (!digits) return null;

  let number = digits.startsWith('+') ? digits.slice(1) : digits;
  number = number.replace(/\D/g, '');
  if (number.length < 8) return null;

  return `whatsapp:+${number}`;
}

function buildUserWhatsAppBody(data: DemoRequestBody): string {
  return [
    `Hi ${data.fullName.split(' ')[0] || 'there'},`,
    '',
    'Thanks for your demo request on gnanova.pro.',
    `We've noted your interest in ${data.productInterest}.`,
    '',
    'Manasa will reach out within 24 hours.',
    '',
    '— Gnanova AI',
  ].join('\n');
}

async function sendTwilioWhatsApp(data: DemoRequestBody): Promise<{ sent: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;

  if (!accountSid || !authToken || !from) {
    return { sent: false, error: 'Twilio WhatsApp not configured' };
  }

  const to = normalizeWhatsAppTo(data.whatsapp);
  if (!to) {
    return { sent: false, error: 'Invalid WhatsApp number' };
  }

  const params = new URLSearchParams();
  params.set('From', from.startsWith('whatsapp:') ? from : `whatsapp:${from}`);
  params.set('To', to);

  const templateSid = process.env.TWILIO_WHATSAPP_CONTENT_SID;
  if (templateSid) {
    // Meta-approved template (required outside Twilio sandbox for most business use)
    params.set('ContentSid', templateSid);
    params.set(
      'ContentVariables',
      JSON.stringify({
        '1': data.fullName.split(' ')[0] || data.fullName,
        '2': data.productInterest,
      })
    );
  } else {
    // Sandbox / free-form body (works in Twilio WhatsApp sandbox after user opts in)
    params.set('Body', buildUserWhatsAppBody(data));
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
  const twilioRes = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    }
  );

  if (!twilioRes.ok) {
    const errText = await twilioRes.text();
    console.error('Twilio WhatsApp error:', errText);
    return { sent: false, error: 'Twilio send failed' };
  }

  return { sent: true };
}

async function sendOwnerEmailViaResend(data: DemoRequestBody, subject: string, text: string) {
  const from = process.env.RESEND_FROM || 'Gnanova <onboarding@resend.dev>';
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: CONTACT_EMAIL,
      reply_to: data.email,
      subject,
      text,
    }),
  });

  if (!emailRes.ok) {
    throw new Error('Failed to send owner email via Resend');
  }

  // Auto-reply to the user
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: data.email,
      subject: 'We received your Gnanova demo request',
      text: FORMSUBMIT_AUTORESPONSE,
    }),
  });
}

async function sendOwnerEmailViaFormSubmit(data: DemoRequestBody, subject: string) {
  const endpoint = FORMSUBMIT_ID || CONTACT_EMAIL;
  const formRes = await fetch(`https://formsubmit.co/ajax/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      _replyto: data.email,
      _autoresponse: FORMSUBMIT_AUTORESPONSE,
      email: data.email,
      name: data.fullName,
      'Full Name': data.fullName,
      'Company Name': data.companyName,
      'Email Address': data.email,
      WhatsApp: data.whatsapp,
      Country: data.country,
      Role: data.role,
      'Product Interest': data.productInterest,
      'Pain Point': data.painPoint,
      'Preferred Contact': data.contactMethod,
      'Best Time': data.bestTime,
    }),
  });

  if (!formRes.ok) {
    throw new Error('Failed to submit via FormSubmit');
  }
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
  const subject = `Demo Request: ${data.fullName} (${data.email}) — ${data.companyName}`;

  try {
    if (process.env.RESEND_API_KEY) {
      await sendOwnerEmailViaResend(data, subject, text);
    } else {
      await sendOwnerEmailViaFormSubmit(data, subject);
    }
  } catch (err) {
    console.error('Contact email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }

  // WhatsApp is best-effort — don't fail the form if Twilio isn't ready
  const whatsapp = await sendTwilioWhatsApp(data).catch((err) => {
    console.error('WhatsApp send error:', err);
    return { sent: false, error: 'WhatsApp exception' };
  });

  return res.status(200).json({
    success: true,
    whatsappSent: whatsapp.sent,
    whatsappError: whatsapp.error,
  });
}
