export const CONTACT_EMAIL = 'manasa@gnanova.pro';

/** WhatsApp number with country code, no + or spaces. Set VITE_WHATSAPP_NUMBER in Vercel env. */
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '';

export const getWhatsAppUrl = (message?: string) => {
  if (!WHATSAPP_NUMBER) return '';
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const DEMO_WHATSAPP_MESSAGE =
  'Hi Manasa, I submitted a demo request on gnanova.pro';
