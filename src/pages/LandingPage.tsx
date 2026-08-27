import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDemoModal } from '../contexts/DemoModalContext';
import { GnanovaLogo } from '../components/GnanovaLogo';
import {
  Sparkles,
  Zap,
  Target,
  CheckCircle2,
  ArrowRight,
  Play,
  Star,
  Users,
  BarChart3,
  Brain,
  Rocket,
  Shield,
  MessageCircle,
  Workflow,
  ChevronDown,
  Building2,
  FileText,
  FileSpreadsheet,
  Bot,
  Layers,
  type LucideIcon,
} from 'lucide-react';

type BadgeVariant = 'live' | 'preview' | 'inside' | 'muted';

type ProductCard = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  buttonText?: string;
  link?: string;
  external?: boolean;
  comingSoon?: boolean;
  badge?: string;
  badgeVariant?: BadgeVariant;
  featured?: boolean;
  subtitle?: string;
  interestPrompt?: string;
};

type ProductSection = {
  id: string;
  header: string;
  eyebrow?: string;
  description?: string;
  sectionBadge?: string;
  showInterestBar?: boolean;
  cards: ProductCard[];
};

const ESTATECFO_URL = import.meta.env.VITE_ESTATECFO_URL as string | undefined;
const RERA_OS_URL = import.meta.env.VITE_RERA_OS_URL as string | undefined;

const badgeVariantClasses: Record<BadgeVariant, string> = {
  live: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  preview: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  inside: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  muted: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const productNavGroups = [
  {
    label: 'IFRS Compliance',
    items: [{ name: 'IFRS.ai', href: 'https://ifrsai.vercel.app/', external: true }],
  },
  {
    label: 'Real Estate',
    items: [
      { name: 'EstateCFO', href: '#real-estate' },
      { name: 'Gnanova RERA OS', href: '#real-estate' },
    ],
  },
  {
    label: 'Finance Operations',
    items: [
      { name: 'FinReportAI', href: '#finance-operations' },
      { name: 'InvoiceFlow', href: '#finance-operations' },
    ],
  },
  {
    label: 'CA Firm',
    items: [{ name: 'CPA OS', href: '#ca-firm' }],
  },
  {
    label: 'Other',
    items: [
      { name: 'ReceptAI', href: '#other-products' },
      { name: 'LegalMind AI', href: '#other-products' },
    ],
  },
];

const productSections: ProductSection[] = [
  {
    id: 'ifrs-ai',
    header: 'IFRS.ai — Core Product',
    sectionBadge: 'Flagship · Live Now',
    cards: [
      {
        icon: BarChart3,
        title: 'IFRS.ai',
        description:
          'AI-powered IFRS 16 lease accounting, IFRS 15 revenue recognition, and IFRS 9 ECL provisioning. Built specifically for UAE real estate developers and CA firms. 97-99% extraction accuracy from English and Arabic contracts.',
        color: 'from-orange-500 to-amber-600',
        buttonText: 'Open IFRS.ai',
        link: 'https://ifrsai.vercel.app/',
        external: true,
        featured: true,
      },
    ],
  },
  {
    id: 'real-estate-finance',
    header: 'Real Estate Finance Layer',
    cards: [
      {
        icon: Building2,
        title: 'IFRS 15 Real Estate UAE',
        subtitle: 'inside IFRS.ai',
        description:
          'Off-plan SPA revenue recognition, RERA compliance, escrow tracking, FTA VAT reconciliation, and RERA deadline tracker.',
        color: 'from-orange-500 to-amber-600',
        buttonText: 'View in IFRS.ai',
        link: 'https://ifrsai.vercel.app/dashboard/ifrs15/realestate',
        external: true,
      },
      {
        icon: FileText,
        title: 'IFRS 16 Lease Management',
        subtitle: 'inside IFRS.ai',
        description:
          'Lease contract management, ROU asset and liability calculation, rent schedules, renewals, and IFRS 16 compliant disclosure notes.',
        color: 'from-orange-500 to-amber-600',
        buttonText: 'View in IFRS.ai',
        link: 'https://ifrsai.vercel.app/dashboard/ifrs16',
        external: true,
      },
    ],
  },
  {
    id: 'real-estate',
    eyebrow: 'Real Estate',
    header: 'AI-Powered Real Estate CFO Stack',
    description:
      'From CRM to compliance — the full finance operating layer for real estate developers and CA firms managing rental portfolios.',
    showInterestBar: false,
    cards: [
      {
        icon: Building2,
        title: 'EstateCFO',
        description:
          'Real estate CFO dashboard built for CA firms managing rental portfolios. KPI tracking, AR/AP aging, NOI analysis, and Power BI-style analytics — currently deployed for a multi-entity rental portfolio client.',
        color: 'from-[#667eea] to-[#764ba2]',
        badge: 'Live Now',
        badgeVariant: 'live',
        buttonText: 'Open EstateCFO',
        link: ESTATECFO_URL || '/contact',
        external: Boolean(ESTATECFO_URL),
        interestPrompt: 'Interested in EstateCFO? Tell us your requirements.',
      },
      {
        icon: Layers,
        title: 'Gnanova RERA OS',
        description:
          'End-to-end real estate operating system — CRM and booking, construction progress tracking, revenue leakage detection, and RERA-style compliance and QPR reporting, unified into one CFO decision console.',
        color: 'from-[#f093fb] to-[#f5576c]',
        badge: 'Builder Preview',
        badgeVariant: 'preview',
        buttonText: 'View Demo',
        link: RERA_OS_URL || '/contact',
        external: Boolean(RERA_OS_URL),
        interestPrompt: 'Interested in RERA OS? Tell us your requirements.',
      },
      {
        icon: FileText,
        title: 'IFRS 15 & 16 for Real Estate',
        description:
          'Off-plan SPA revenue recognition, RERA compliance, escrow tracking, and lease accounting — the compliance engine powering EstateCFO and RERA OS underneath.',
        color: 'from-orange-500 to-amber-600',
        badge: 'Inside IFRS.ai',
        badgeVariant: 'inside',
        buttonText: 'View in IFRS.ai',
        link: 'https://ifrsai.vercel.app/dashboard/ifrs15/realestate',
        external: true,
      },
    ],
  },
  {
    id: 'finance-operations',
    header: 'Finance Operations',
    cards: [
      {
        icon: BarChart3,
        title: 'FinReportAI',
        description:
          'IFRS 15 & 16 automation, journal entry anomaly detection, FP&A dashboards, and CFO-ready reports. Built for CA firms and finance teams.',
        color: 'from-[#667eea] to-[#764ba2]',
      },
      {
        icon: Workflow,
        title: 'InvoiceFlow',
        description:
          'End-to-end AP automation with OCR, 3-way matching, GST compliance, and duplicate detection. Zero manual data entry.',
        color: 'from-[#f093fb] to-[#f5576c]',
      },
      {
        icon: FileSpreadsheet,
        title: 'IFRS Financial Statements',
        description:
          'Trial balance to full IFRS financial statements — balance sheet, P&L, cash flow (IAS 7), and group consolidation. Auto-generated disclosure notes.',
        color: 'from-gray-500 to-gray-600',
        buttonText: 'Coming Soon',
        comingSoon: true,
        badge: 'Roadmap',
      },
    ],
  },
  {
    id: 'ai-copilot',
    header: 'AI Copilot',
    cards: [
      {
        icon: Bot,
        title: 'Gnanova AI Copilot',
        description:
          'Contract intelligence, disclosure generation, financial analysis, and board reporting — powered by Claude AI and AWS Nova.',
        color: 'from-[#667eea] to-[#4facfe]',
        buttonText: 'Coming Soon',
        comingSoon: true,
        badge: 'Roadmap',
      },
    ],
  },
  {
    id: 'ca-firm',
    header: 'CA Firm Workspace',
    cards: [
      {
        icon: Users,
        title: 'CPA OS',
        description:
          'Multi-client compliance console for CA firms managing 10-20 clients. IFRS status tracking, audit packs, analytics, and compliance monitoring across your entire client portfolio.',
        color: 'from-[#4facfe] to-[#00f2fe]',
      },
    ],
  },
  {
    id: 'other-products',
    header: 'Other Products',
    cards: [
      {
        icon: MessageCircle,
        title: 'ReceptAI',
        description:
          'AI voice agents for dental, legal, HVAC, medical spa, chiropractic, veterinary, and orthodontics. Handles inbound calls and reactivation outreach 24/7.',
        color: 'from-[#43e97b] to-[#38f9d7]',
      },
      {
        icon: Shield,
        title: 'LegalMind AI',
        description:
          'Contract review and legal research AI trained on UAE, DIFC, and Indian law. Flags risk clauses and generates structured legal summaries.',
        color: 'from-[#fa709a] to-[#fee140]',
      },
    ],
  },
];

export const LandingPage = () => {
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const { openDemoModal } = useDemoModal();

  const stats = [
    { value: '3', label: 'IFRS Standards Live' },
    { value: '97-99%', label: 'AI Extraction Accuracy' },
    { value: '12+', label: 'Years Finance Expertise' },
    { value: 'UAE', label: 'Real Estate Focused' },
  ];

  const benefits = [
    { icon: Users, title: 'Built by Finance Experts', description: 'Designed by a CMA with 12+ years at Barclays and HSBC. We understand the real problems, not just the tech.' },
    { icon: Brain, title: 'ML + AI, Not Just Prompting', description: "Our finance products use Isolation Forest, SHAP, and Benford's Law — not generic LLM outputs. Accurate, auditable, explainable." },
    { icon: Shield, title: 'CA Standards Compliant', description: 'Client data never leaves your system. Our privacy layer ensures ICAI compliance for every CA firm deployment.' },
    { icon: Workflow, title: 'Integration-First', description: 'Works on top of your existing ERP, Tally, Zoho, or Oracle setup. No rip-and-replace needed.' },
  ];

  const renderProductButton = (card: ProductCard) => {
    if (!card.buttonText) return null;

    const buttonClass = card.comingSoon
      ? 'inline-flex items-center gap-2 px-5 py-2.5 mt-6 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-gray-500 cursor-not-allowed'
      : card.featured
        ? 'inline-flex items-center gap-2 px-5 py-2.5 mt-6 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all group/btn'
        : 'inline-flex items-center gap-2 px-5 py-2.5 mt-6 bg-white/10 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all group/btn';

    if (card.comingSoon) {
      return <span className={buttonClass}>{card.buttonText}</span>;
    }

    if (card.external && card.link) {
      return (
        <a
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          {card.buttonText}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      );
    }

    return (
      <Link to={card.link || '#'} className={buttonClass}>
        {card.buttonText}
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto pl-2 pr-6 py-4">
          <div className="flex items-center justify-between">
            <GnanovaLogo height={40} />

            <div className="hidden md:flex items-center gap-8">
              <div
                className="relative"
                onMouseEnter={() => setShowProductsMenu(true)}
                onMouseLeave={() => setShowProductsMenu(false)}
              >
                <button
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setShowProductsMenu(!showProductsMenu)}
                >
                  Products
                  <ChevronDown className={`w-4 h-4 transition-transform ${showProductsMenu ? 'rotate-180' : ''}`} />
                </button>

                {showProductsMenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-[#141414] border border-white/10 rounded-xl shadow-2xl py-3 z-50">
                    {productNavGroups.map((group, groupIdx) => (
                      <div key={group.label} className={groupIdx > 0 ? 'mt-2 pt-2 border-t border-white/10' : ''}>
                        <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {group.label}
                        </div>
                        {group.items.map((item) =>
                          item.external ? (
                            <a
                              key={item.name}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              {item.name}
                            </a>
                          ) : (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                              onClick={() => setShowProductsMenu(false)}
                            >
                              {item.name}
                            </a>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Who We Help</a>
              <Link to="/library" className="text-gray-300 hover:text-white transition-colors">Library</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Sign In
              </Link>
              <button
                type="button"
                onClick={openDemoModal}
                className="px-6 py-2.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#667eea]/30 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#667eea]/20 rounded-full blur-[128px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f093fb]/20 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#4facfe]/20 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(102, 126, 234, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: 'linear-gradient(135deg, #667eea, #f093fb)',
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          ></div>
        ))}

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8 animate-slideDown">
            <Sparkles className="w-4 h-4 text-[#667eea]" />
            <span className="text-xs text-gray-300">IFRS Compliance · Real Estate Finance · CA Firm AI</span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slideUp leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Gnanova AI — AI-Powered IFRS & Finance Compliance Platform
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
            Purpose-built AI for UAE real estate developers, CA firms, and finance teams. From IFRS 16 lease accounting to revenue recognition, ECL provisioning, AP automation, and UAE VAT compliance — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <a
              href="#features"
              className="group px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-[#667eea]/40 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Explore Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              type="button"
              onClick={openDemoModal}
              className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Book a Demo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-slideUp" style={{ animationDelay: '0.6s' }}>
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-2 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      <section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
              <Zap className="w-4 h-4 text-[#f093fb]" />
              <span className="text-sm text-gray-300">Our Products</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              AI Products & Agents
              <br />
              <span className="bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#4facfe] bg-clip-text text-transparent">
                Built For Your Success
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Purpose-built AI for finance professionals, CA firms, legal and healthcare practices, and real estate teams
            </p>
          </div>

          <div className="space-y-20">
            {productSections.map((section) => (
              <div key={section.id} id={section.id}>
                <div className="mb-8">
                  {section.eyebrow && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#667eea] mb-3">
                      {section.eyebrow}
                    </span>
                  )}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-2xl md:text-3xl font-bold">{section.header}</h3>
                    {section.sectionBadge && (
                      <span className="px-3 py-1 text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">
                        {section.sectionBadge}
                      </span>
                    )}
                  </div>
                  {section.description && (
                    <p className="text-gray-400 max-w-3xl">{section.description}</p>
                  )}
                </div>

                <div className={`grid gap-8 ${section.cards.length === 1 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                  {section.cards.map((card) => (
                    <div
                      key={card.title}
                      className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border transition-all hover:-translate-y-2 overflow-hidden ${
                        card.featured
                          ? 'border-orange-500/50 hover:border-orange-500/70 hover:shadow-lg hover:shadow-orange-500/10'
                          : card.comingSoon
                            ? 'border-white/5 opacity-80'
                            : 'border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                      <div className="relative">
                        {card.badge && (
                          <span
                            className={`inline-block px-2.5 py-1 mb-4 text-xs font-semibold border rounded-full ${
                              badgeVariantClasses[card.badgeVariant || 'muted']
                            }`}
                          >
                            {card.badge}
                          </span>
                        )}
                        <div className={`inline-flex p-4 bg-gradient-to-br ${card.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                          <card.icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold mb-1">
                          {card.title}
                          {card.subtitle && (
                            <span className="text-sm font-normal text-gray-500 ml-2">({card.subtitle})</span>
                          )}
                        </h4>
                        <p className="text-gray-400">{card.description}</p>
                        {renderProductButton(card)}
                        {card.interestPrompt && (
                          <button
                            type="button"
                            onClick={openDemoModal}
                            className="mt-4 text-sm text-gray-500 hover:text-orange-400 transition-colors text-left"
                          >
                            {card.interestPrompt} → Talk to Us
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {section.showInterestBar !== false && (
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-gray-400 text-sm">
                      Interested in {section.header.split('—')[0].trim()}? Tell us your requirements.
                    </p>
                    <button
                      type="button"
                      onClick={openDemoModal}
                      className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all whitespace-nowrap"
                    >
                      Talk to Us
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="relative py-32 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
                <Target className="w-4 h-4 text-[#4facfe]" />
                <span className="text-sm text-gray-300">Why Gnanova</span>
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Experience AI That
                <br />
                <span className="bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                  Actually Delivers ROI
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Join forward-thinking businesses leveraging our AI expertise to dominate their markets and unlock exponential growth
              </p>

              <div className="space-y-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="p-3 bg-gradient-to-br from-[#667eea]/10 to-[#f093fb]/10 rounded-xl group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-6 h-6 text-[#667eea]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/20 to-[#f093fb]/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-6 animate-slideUp" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#667eea] to-[#f093fb] rounded-full animate-progress" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full mb-2"></div>
                    <div className="h-2 bg-white/5 rounded-full w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
              <Star className="w-4 h-4 text-[#f093fb]" />
              <span className="text-sm text-gray-300">Testimonials</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              Trusted by
              <span className="bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent"> Visionary Leaders</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: 'CA Firm Partner', company: 'Hyderabad', rating: 5, text: 'Gnanova AI deployed IFRS reporting automation and journal entry anomaly detection across our audit practice. We\'ve reclaimed countless hours and our close cycle went from weeks to days.' },
              { role: 'CFO', company: 'Manufacturing Company', rating: 5, text: 'Their FinReportAI FP&A dashboards and anomaly detection delivered measurable ROI in just 3 months. Accurate, auditable, and built for how finance teams actually work.' },
              { role: 'Managing Partner', company: 'Law Firm', rating: 5, text: 'LegalMind AI and ReceptAI eliminated 100+ hours of manual contract review and client intake monthly. This is what true digital transformation looks like for legal practices.' },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#f093fb] text-[#f093fb]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center font-bold">
                    {testimonial.role.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.role}</div>
                    <div className="text-sm text-gray-400">at {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <Rocket className="w-20 h-20 text-white mx-auto mb-8" />
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to See Your Product Live?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Book a demo of FinReportAI, ReceptAI, or any of our products on your actual data.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={openDemoModal}
              className="group px-10 py-5 bg-white text-[#667eea] rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Explore Products
            </a>
          </div>

          <p className="text-sm text-white/70 mt-8">Custom demos available for CA firms, CFOs, and legal practices</p>
        </div>
      </section>

      <footer id="contact" className="relative py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-2">
              <GnanovaLogo height={36} linkTo="" />
              <p className="text-sm text-gray-400">Gnanova AI — IFRS Compliance Platform for UAE</p>
              <p className="text-sm text-gray-400">Built by Manasa Padavala · ACCA · Ex-AVP Barclays & HSBC</p>
            </div>

            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>

            <div className="text-sm text-gray-400">
              © 2026 Gnanova Pro AI Technologies Private Limited. All rights reserved. | CIN: U62099TS2026PTC221233
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(15px); }
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from { width: 0%; }
          to { width: 80%; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-progress {
          animation: progress 2s ease-out;
        }
      `}</style>
    </div>
  );
};
