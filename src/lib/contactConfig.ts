export const CONTACT_EMAIL = 'manusmile0587@gmail.com';

/**
 * FormSubmit activation hash from the activate email.
 * Prefer this over the naked email address in production.
 */
export const FORMSUBMIT_ID =
  import.meta.env.VITE_FORMSUBMIT_ID || '44b7f96bf3a656d18d36e1622d199470';

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
