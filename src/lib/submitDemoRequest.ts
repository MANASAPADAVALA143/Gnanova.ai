import {
  CONTACT_EMAIL,
  FORMSUBMIT_AUTORESPONSE,
  FORMSUBMIT_ID,
} from './contactConfig';

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

export function buildFormSubmitPayload(data: DemoRequestData) {
  return {
    _subject: `Demo Request: ${data.fullName} (${data.email}) — ${data.companyName}`,
    _template: 'table',
    _replyto: data.email,
    _autoresponse: FORMSUBMIT_AUTORESPONSE,
    email: data.email,
    name: data.fullName,
    'Full Name': data.fullName,
    'Company Name': data.companyName,
    'Email Address': data.email,
    Email: data.email,
    WhatsApp: data.whatsapp,
    Country: data.country,
    Role: data.role,
    'Product Interest': data.productInterest,
    'Pain Point': data.painPoint,
    'Preferred Contact': data.contactMethod,
    'Best Time': data.bestTime,
  };
}

export async function submitDemoRequest(data: DemoRequestData): Promise<void> {
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

  const endpoint = FORMSUBMIT_ID || CONTACT_EMAIL;
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(endpoint)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(buildFormSubmitPayload(data)),
  });

  if (!res.ok) {
    throw new Error('Failed to submit demo request');
  }
}
