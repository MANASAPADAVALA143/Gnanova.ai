import {
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Building2,
  FileSpreadsheet,
  FileText,
  Layers,
  MessageCircle,
  Shield,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export type BadgeVariant = 'live' | 'preview' | 'inside' | 'muted';

export type ProductCard = {
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

export type ProductSection = {
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

export const badgeVariantClasses: Record<BadgeVariant, string> = {
  live: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  preview: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  inside: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  muted: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

/** All finance-related product sections previously on the homepage */
export const financeProductSections: ProductSection[] = [
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
    id: 'ai-finance-training',
    eyebrow: 'Training',
    header: 'AI for Finance Professionals',
    description:
      'Corporate training to build practical AI skills — tools, prompting, and real finance use cases. Live, hands-on, online or onsite.',
    sectionBadge: 'Limited Seats',
    cards: [
      {
        icon: BookOpen,
        title: 'Corporate Training Program',
        description:
          'AI Fundamentals, ChatGPT / Claude / Copilot overview, Prompt Engineering (RACE Framework), and Claude in Excel — for FP&A, accounting, audit, and treasury.',
        color: 'from-orange-500 to-amber-600',
        badge: 'Live Cohorts',
        badgeVariant: 'live',
        buttonText: 'View Training',
        link: '/training',
      },
      {
        icon: Brain,
        title: '60-Second Reality Check',
        description:
          'Help shape upcoming AI-in-Finance training. Tell us what your team needs — takes under a minute.',
        color: 'from-[#667eea] to-[#764ba2]',
        buttonText: 'Take Survey',
        link: '/survey',
      },
      {
        icon: Sparkles,
        title: 'Free Resource Library',
        description:
          'Automation packs for Finance, Real Estate, and PE teams — bookmark and download from gnanova.pro/library.',
        color: 'from-[#4facfe] to-[#00f2fe]',
        buttonText: 'Open Library',
        link: '/library',
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
