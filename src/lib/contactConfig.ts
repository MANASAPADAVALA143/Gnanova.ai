export const CONTACT_EMAIL = 'contact@gnanova.pro';

/**
 * FormSubmit activation hash from the activate email.
 * Prefer this over the naked email address in production.
 * This is only used as a client-side fallback if the /api/contact
 * serverless function is unreachable.
 */
export const FORMSUBMIT_ID = import.meta.env.VITE_FORMSUBMIT_ID || '';

export const FORMSUBMIT_AUTORESPONSE =
  "Thank you for reaching out to Gnanova AI. We've received your demo request and Manasa will get back to you within 24 hours via your preferred contact method. — Team Gnanova";

/** WhatsApp number with country code, no + or spaces. Set VITE_WHATSAPP_NUMBER in Vercel env. */
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '';

export const getWhatsAppUrl = (message?: string) => {
  if (!WHATSAPP_NUMBER) return '';
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const DEMO_WHATSAPP_MESSAGE =
  'Hi Manasa, I submitted a demo request on gnanova.pro';
