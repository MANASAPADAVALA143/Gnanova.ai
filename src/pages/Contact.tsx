import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { DemoRequestForm } from '../components/DemoRequestForm';
import { WhatsAppFloat } from '../components/WhatsAppFloat';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#667eea] bg-clip-text text-transparent">
              Gnanova.pro
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Talk to Us</h1>
          <p className="text-xl text-gray-400">
            Book a demo of IFRS.ai or any Gnanova product. Manasa will respond within 24 hours.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <DemoRequestForm />
        </div>
      </main>

      <WhatsAppFloat />
    </div>
  );
};
