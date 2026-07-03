import { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { submitDemoRequest, type DemoRequestData } from '../lib/submitDemoRequest';
import { DEMO_WHATSAPP_MESSAGE, getWhatsAppUrl } from '../lib/contactConfig';

const COUNTRIES = ['UAE', 'India', 'UK', 'USA', 'Saudi Arabia', 'Other'];
const ROLES = ['CFO', 'Finance Manager', 'CA', 'Real Estate Developer', 'Other'];
const PRODUCTS = ['IFRS 16', 'IFRS 15', 'IFRS 9', 'All Three', 'Not Sure'];
const CONTACT_METHODS = ['WhatsApp', 'Email', 'Video Call'];
const BEST_TIMES = ['Morning UAE', 'Afternoon UAE', 'Evening UAE'];

const inputClass =
  'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none text-white placeholder-gray-500';

const labelClass = 'block text-sm font-medium text-gray-400 mb-2';

type DemoRequestFormProps = {
  compact?: boolean;
  onSuccess?: () => void;
};

export const DemoRequestForm = ({ compact = false, onSuccess }: DemoRequestFormProps) => {
  const [form, setForm] = useState<DemoRequestData>({
    fullName: '',
    companyName: '',
    email: '',
    whatsapp: '',
    country: 'UAE',
    role: 'CFO',
    productInterest: 'All Three',
    painPoint: '',
    contactMethod: 'WhatsApp',
    bestTime: 'Morning UAE',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (field: keyof DemoRequestData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitDemoRequest(form);
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setError('Something went wrong. Please try again or contact us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    const whatsappUrl = getWhatsAppUrl(DEMO_WHATSAPP_MESSAGE);

    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <span className="text-3xl">✓</span>
        </div>
        <h3 className="text-2xl font-bold mb-4">Thank you!</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Manasa will reach out within 24 hours via your preferred contact method.
        </p>
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20bd5a] transition-colors"
          >
            Or chat on WhatsApp now
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-4' : 'space-y-5'}>
      <div className={compact ? 'grid md:grid-cols-2 gap-4' : 'grid md:grid-cols-2 gap-5'}>
        <div>
          <label htmlFor="demo-fullName" className={labelClass}>Full Name *</label>
          <input
            id="demo-fullName"
            type="text"
            required
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            className={inputClass}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="demo-company" className={labelClass}>Company Name *</label>
          <input
            id="demo-company"
            type="text"
            required
            value={form.companyName}
            onChange={(e) => update('companyName', e.target.value)}
            className={inputClass}
            placeholder="Company name"
          />
        </div>
        <div>
          <label htmlFor="demo-email" className={labelClass}>Your Email Address *</label>
          <input
            id="demo-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="demo-whatsapp" className={labelClass}>WhatsApp Number *</label>
          <input
            id="demo-whatsapp"
            type="tel"
            required
            value={form.whatsapp}
            onChange={(e) => update('whatsapp', e.target.value)}
            className={inputClass}
            placeholder="+971 50 123 4567"
          />
        </div>
        <div>
          <label htmlFor="demo-country" className={labelClass}>Country</label>
          <select
            id="demo-country"
            value={form.country}
            onChange={(e) => update('country', e.target.value)}
            className={inputClass}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c} className="bg-[#141414]">{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="demo-role" className={labelClass}>Role</label>
          <select
            id="demo-role"
            value={form.role}
            onChange={(e) => update('role', e.target.value)}
            className={inputClass}
          >
            {ROLES.map((r) => (
              <option key={r} value={r} className="bg-[#141414]">{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="demo-product" className={labelClass}>Which product interests you?</label>
          <select
            id="demo-product"
            value={form.productInterest}
            onChange={(e) => update('productInterest', e.target.value)}
            className={inputClass}
          >
            {PRODUCTS.map((p) => (
              <option key={p} value={p} className="bg-[#141414]">{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="demo-contact" className={labelClass}>Preferred contact method</label>
          <select
            id="demo-contact"
            value={form.contactMethod}
            onChange={(e) => update('contactMethod', e.target.value)}
            className={inputClass}
          >
            {CONTACT_METHODS.map((m) => (
              <option key={m} value={m} className="bg-[#141414]">{m}</option>
            ))}
          </select>
        </div>
        <div className={compact ? '' : 'md:col-span-2'}>
          <label htmlFor="demo-time" className={labelClass}>Best time to connect</label>
          <select
            id="demo-time"
            value={form.bestTime}
            onChange={(e) => update('bestTime', e.target.value)}
            className={inputClass}
          >
            {BEST_TIMES.map((t) => (
              <option key={t} value={t} className="bg-[#141414]">{t}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="demo-pain" className={labelClass}>Main pain point</label>
          <textarea
            id="demo-pain"
            required
            rows={compact ? 3 : 4}
            value={form.painPoint}
            onChange={(e) => update('painPoint', e.target.value)}
            className={inputClass}
            placeholder="Tell us about your IFRS or finance compliance challenge..."
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 px-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            Book a Demo
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};
