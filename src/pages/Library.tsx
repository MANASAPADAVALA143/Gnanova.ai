import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { GnanovaLogo } from '../components/GnanovaLogo';

type Lane = 'Real Estate' | 'Finance & CFO' | 'Private Equity' | 'UAE VAT';

type FilterId = 'All' | 'Real Estate' | 'Finance & CFO' | 'FP&A' | 'Private Equity' | 'UAE VAT';

type LibraryPack = {
  id: string;
  lane: Lane;
  filters: Exclude<FilterId, 'All'>[];
  title: string;
  description: string;
  bullets: string[];
  downloadUrl: string;
  badge: 'Free';
};

const FILTERS: FilterId[] = [
  'All',
  'Real Estate',
  'Finance & CFO',
  'FP&A',
  'Private Equity',
  'UAE VAT',
];

const laneStyles: Record<Lane, string> = {
  'Real Estate': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Finance & CFO': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  'Private Equity': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'UAE VAT': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

const LIBRARY_PACKS: LibraryPack[] = [
  {
    id: 'estatecfo-multi-entity-close',
    lane: 'Real Estate',
    filters: ['Real Estate'],
    title: 'EstateCFO Multi-Entity Close Pack',
    description:
      'The AI system that caught AED 1.28M in revenue leakage for a UAE multi-entity real estate portfolio.',
    bullets: [
      'Multi-entity consolidation & intercompany elimination checker',
      'IFRS 16 lease liability & ROU asset rollforward',
      'Rent roll reconciliation (tenant ledger vs GL vs bank)',
      'Broker commission invoicing reconciliation',
      'RERA compliance checklist auto-flagger',
    ],
    downloadUrl: '#',
    badge: 'Free',
  },
  {
    id: 'fpa-variance-forecast',
    lane: 'Finance & CFO',
    filters: ['Finance & CFO', 'FP&A'],
    title: 'FP&A Variance & Forecast Pack',
    description:
      'Cut your monthly variance pack from 4 days to 4 hours. Built from 12+ years of Barclays/HSBC FP&A experience.',
    bullets: [
      'Budget vs actual auto-variance engine with threshold flagging',
      'Rolling 13-week forecast updater',
      'Board deck narrative generator (auto-drafts commentary)',
      'Scenario/sensitivity table generator (best/base/worst)',
    ],
    downloadUrl: '#',
    badge: 'Free',
  },
  {
    id: 'ic-memo-lp-reporting',
    lane: 'Private Equity',
    filters: ['Private Equity'],
    title: 'IC Memo & LP Reporting Pack',
    description:
      '10 AI prompts that write your IC memo, run LP reporting, and automate portfolio monitoring — on your own Claude account.',
    bullets: [
      'IC memo drafting (investment thesis, risks, recommendation)',
      'LP quarterly reporting pack',
      'Portfolio company operating dashboard',
      'Deal pipeline CRM & process tracker',
    ],
    downloadUrl: '#',
    badge: 'Free',
  },
  {
    id: 'uae-vat-reconciliation',
    lane: 'UAE VAT',
    filters: ['UAE VAT'],
    title: 'UAE VAT Reconciliation Pack',
    description:
      'The GulfTax AI pack for UAE CA firms managing multi-entity VAT filings — Box 1/9 mapping, bulk approve, PDF sync.',
    bullets: [
      'VAT return Box 1-9 auto-mapping',
      'Multi-entity bulk approve workflow',
      'Invoice PDF to VAT classifier pipeline',
      'EmaraTax filing readiness checklist',
    ],
    downloadUrl: '#',
    badge: 'Free',
  },
];

const PAGE_TITLE =
  'AI Resource Library | Gnanova — Finance, Real Estate & PE Automation Packs';
const PAGE_DESCRIPTION =
  'Free AI automation prompt packs and tools for CFOs, real estate controllers, and PE teams. Built by a former Barclays/HSBC AVP.';

function setMetaDescription(content: string) {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

export const Library = () => {
  const [activeFilter, setActiveFilter] = useState<FilterId>('All');

  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription =
      document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

    document.title = PAGE_TITLE;
    setMetaDescription(PAGE_DESCRIPTION);

    return () => {
      document.title = previousTitle;
      if (previousDescription) setMetaDescription(previousDescription);
    };
  }, []);

  const visiblePacks = useMemo(() => {
    if (activeFilter === 'All') return LIBRARY_PACKS;
    return LIBRARY_PACKS.filter((pack) => pack.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <GnanovaLogo height={40} />
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hidden sm:inline text-sm text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <header className="max-w-3xl mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <span className="text-sm text-gray-300">Resource Library</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Gnanova AI Resource Library</h1>
          <p className="text-lg md:text-xl text-gray-400 mb-3">
            Free AI automation packs for Finance, Real Estate, and Private Equity teams. Built by
            practitioners, not theorists.
          </p>
          <p className="text-sm text-gray-500">New packs added weekly — bookmark this page</p>
        </header>

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] border-transparent text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {visiblePacks.length === 0 ? (
          <p className="text-gray-400 text-center py-16">No packs in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visiblePacks.map((pack) => (
              <article
                key={pack.id}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all overflow-hidden flex flex-col"
              >
                <span className="absolute top-6 right-6 px-2.5 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  {pack.badge}
                </span>

                <span
                  className={`inline-block self-start px-2.5 py-1 mb-4 text-xs font-semibold border rounded-full ${laneStyles[pack.lane]}`}
                >
                  {pack.lane}
                </span>

                <h2 className="text-xl font-bold mb-3 pr-14">{pack.title}</h2>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{pack.description}</p>

                <div className="mb-8 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    What&apos;s inside
                  </p>
                  <ul className="space-y-2">
                    {pack.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-sm text-gray-400">
                        <span className="text-[#667eea] mt-0.5 shrink-0">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={pack.downloadUrl}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#667eea]/30 transition-all group/btn"
                >
                  <Download className="w-4 h-4" />
                  Download
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </article>
            ))}
          </div>
        )}

        <div className="mt-16 p-8 md:p-10 bg-white/5 border border-white/10 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Want a custom pack for your firm?</h3>
            <p className="text-gray-400 text-sm max-w-xl">
              Tell us your stack and close process — we&apos;ll map an automation pack for your team.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all whitespace-nowrap"
          >
            Talk to Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};
