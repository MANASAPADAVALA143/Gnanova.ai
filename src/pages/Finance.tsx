import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3 } from 'lucide-react';
import { SiteNav } from '../components/SiteNav';
import { ProductSections } from '../components/ProductSections';
import { GnanovaLogo } from '../components/GnanovaLogo';
import { useDemoModal } from '../contexts/DemoModalContext';
import { financeProductSections } from '../data/financeProducts';

export const Finance = () => {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNav variant="sticky" />

      <section className="relative px-6 pt-16 pb-12 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <BarChart3 className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300">Finance & CA Firms</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">
            AI Automation for Finance, IFRS & Real Estate
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-8">
            IFRS compliance, AP automation, EstateCFO dashboards, and CA firm workspaces — the full
            finance stack built by practitioners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => openDemoModal()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/training"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all"
            >
              AI Finance Training
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <ProductSections sections={financeProductSections} />
        </div>
      </section>

      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <GnanovaLogo height={32} />
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/schools" className="hover:text-white transition-colors">
              Schools
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-xs text-gray-500 text-center md:text-right max-w-sm">
            © 2026 Gnanova Pro AI Technologies Private Limited. All rights reserved. | CIN:
            U62099TS2026PTC221233
          </p>
        </div>
      </footer>
    </div>
  );
};
