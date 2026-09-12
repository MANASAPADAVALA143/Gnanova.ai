import { Link } from 'react-router-dom';
import { ArrowRight, HeartPulse } from 'lucide-react';
import { SiteNav } from '../components/SiteNav';
import { GnanovaLogo } from '../components/GnanovaLogo';
import { useDemoModal } from '../contexts/DemoModalContext';

export const Healthcare = () => {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNav variant="sticky" />

      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
          <HeartPulse className="w-4 h-4 text-rose-400" />
          <span className="text-sm text-gray-300">Healthcare</span>
        </div>
        <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
          Coming Soon
        </span>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Patient scheduling, billing & operations automation
        </h1>
        <p className="text-lg text-gray-400 mb-10">
          Healthcare automation is launching soon. Join the waitlist and we&apos;ll notify you when
          demos open.
        </p>
        <button
          type="button"
          onClick={() => openDemoModal()}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#667eea]/30 transition-all"
        >
          Join Waitlist
          <ArrowRight className="w-5 h-5" />
        </button>
      </main>

      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <GnanovaLogo height={32} />
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/finance" className="hover:text-white transition-colors">
              Finance
            </Link>
            <Link to="/schools" className="hover:text-white transition-colors">
              Schools
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
