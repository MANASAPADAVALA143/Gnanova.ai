import { CONTACT_EMAIL } from './contactConfig';

export type DemoRequestData = {
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

export async function submitDemoRequest(data: DemoRequestData): Promise<void> {
  const payload = {
    _subject: `Demo Request: ${data.fullName} — ${data.companyName}`,
    _template: 'table',
    'Full Name': data.fullName,
    'Company Name': data.companyName,
    Email: data.email,
    WhatsApp: data.whatsapp,
    Country: data.country,
    Role: data.role,
    'Product Interest': data.productInterest,
    'Pain Point': data.painPoint,
    'Preferred Contact': data.contactMethod,
    'Best Time': data.bestTime,
  };

  try {
    const apiRes = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (apiRes.ok) return;
  } catch {
    // fall through to FormSubmit
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to submit demo request');
  }
}
