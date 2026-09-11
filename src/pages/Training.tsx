import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Copy,
  FileSpreadsheet,
  MessageCircle,
  Sparkles,
  Target,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import { GnanovaLogo } from '../components/GnanovaLogo';
import { useDemoModal } from '../contexts/DemoModalContext';

const PAGE_TITLE = 'AI for Finance Professionals | Corporate Training | Gnanova Pro';
const PAGE_DESCRIPTION =
  'Live, practical corporate training on AI fundamentals, ChatGPT/Claude/Copilot, prompt engineering (RACE), and Claude in Excel — built for FP&A, accounting, audit, and treasury teams.';

const TRAINING_SHARE_URL = 'https://www.gnanova.pro/training?utm_source=whatsapp';

const WHATSAPP_SHARE_CAPTION = `AI FOR FINANCE PROFESSIONALS
Build a basic understanding of AI — tools, prompting, and practical use for finance.

Limited Seats | Online / Onsite Corporate Training

👉 Register Now:
${TRAINING_SHARE_URL}`;

const modules = [
  {
    icon: Brain,
    title: 'AI Fundamentals',
    description: 'Key concepts and real-world applications of AI in finance.',
    color: 'from-[#667eea] to-[#764ba2]',
  },
  {
    icon: Sparkles,
    title: 'ChatGPT / Claude / Copilot Overview',
    description: 'What these tools are, how they differ, and how to use them effectively.',
    color: 'from-[#4facfe] to-[#00f2fe]',
  },
  {
    icon: Workflow,
    title: 'Prompt Engineering (RACE Framework)',
    description: 'A structured approach to writing better prompts for useful finance results.',
    color: 'from-[#f093fb] to-[#f5576c]',
  },
  {
    icon: FileSpreadsheet,
    title: 'Claude in Excel',
    description: 'Analyze, summarize, and work with financial data inside Microsoft Excel.',
    color: 'from-orange-500 to-amber-600',
  },
];

const whyJoin = [
  { icon: Zap, title: 'Be More Productive', description: 'Cut hours of manual work with practical AI workflows.' },
  { icon: Workflow, title: 'Work Smarter with AI', description: 'Use ChatGPT, Claude, and Copilot the right way for finance.' },
  { icon: Target, title: 'Solve Real Finance Use Cases', description: 'Apply AI to FP&A, accounting, audit, and treasury problems.' },
  { icon: Users, title: 'Stay Ahead in Your Career', description: 'Build skills that compound as AI becomes table stakes.' },
];

const pillars = ['Learn', 'Apply', 'Solve Real Problems', 'Grow'];

function setMetaDescription(content: string) {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

export const Training = () => {
  const { openDemoModal } = useDemoModal();
  const [copied, setCopied] = useState<'link' | 'caption' | null>(null);

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

  const copyText = async (value: string, kind: 'link' | 'caption') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(WHATSAPP_SHARE_CAPTION)}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <GnanovaLogo height={40} />
          <div className="flex items-center gap-6">
            <Link to="/library" className="hidden sm:inline text-sm text-gray-400 hover:text-white transition-colors">
              Library
            </Link>
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

      <main>
        <section className="relative px-6 pt-14 pb-16 md:pt-20 md:pb-24 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#667eea]/15 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]" />

          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-300">Corporate Training · Learn | Apply | Grow</span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-[#667eea] mb-3">
                Practical AI Skills for Real Finance Impact
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                AI for Finance Professionals
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-6 max-w-xl">
                Build a basic understanding of AI — tools, prompting, and practical use for finance.
                Live, hands-on training for FP&amp;A, accounting, audit, and treasury teams.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="px-3 py-1.5 text-xs font-semibold bg-white/5 border border-white/10 rounded-full text-gray-300"
                  >
                    {pillar}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => openDemoModal('AI Finance Training')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link
                  to="/survey"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  Take 60-Second Survey
                </Link>
              </div>

              <p className="text-sm text-amber-400/90 mt-4 font-medium">Limited seats — Online / Onsite (Corporate)</p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/20 to-orange-500/10 rounded-3xl blur-2xl" />
              <img
                src="/ai-finance-training.jpg"
                alt="Gnanova Pro corporate training poster — AI for Finance Professionals"
                className="relative w-full rounded-3xl border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#667eea] mb-3">
                Curriculum
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">What You&apos;ll Learn</h2>
              <p className="text-gray-400 max-w-2xl">
                Same numbers. Bigger possibilities — from fundamentals to Claude in Excel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {modules.map((module) => (
                <div
                  key={module.title}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <div className="relative">
                    <div className={`inline-flex p-4 bg-gradient-to-br ${module.color} rounded-2xl mb-6`}>
                      <module.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                    <p className="text-gray-400">{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 bg-white/5 border-y border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#667eea] mb-3">
                Why Join
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">Built for Finance Professionals</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyJoin.map((item) => (
                <div key={item.title} className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                  <item.icon className="w-6 h-6 text-[#667eea] mb-4" />
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>

            <ul className="mt-10 grid sm:grid-cols-2 gap-3 max-w-3xl">
              {[
                'Audience: FP&A, Accounting, Audit, Treasury, and finance leaders',
                'Format: Live, practical, hands-on training',
                'Delivery: Online or onsite corporate cohorts',
                'Outcome: Tools, prompting, and finance-ready AI workflows',
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#667eea] mb-3">
                Share on WhatsApp
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Send this to your students</h2>
              <p className="text-gray-400 text-sm">
                WhatsApp images are not clickable. Send the poster plus this caption — the URL becomes
                the Register Now link.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Ready-to-send caption
                </p>
                <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 leading-relaxed">
                  {WHATSAPP_SHARE_CAPTION}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => copyText(WHATSAPP_SHARE_CAPTION, 'caption')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/15 transition-all"
                >
                  <Copy className="w-4 h-4" />
                  {copied === 'caption' ? 'Caption copied' : 'Copy caption'}
                </button>
                <button
                  type="button"
                  onClick={() => copyText(TRAINING_SHARE_URL, 'link')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/15 transition-all"
                >
                  <Copy className="w-4 h-4" />
                  {copied === 'link' ? 'Link copied' : 'Copy link only'}
                </button>
                <a
                  href={whatsappShareHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-xl text-sm font-semibold hover:bg-[#20bd5a] transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp with caption
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Smarter Finance.{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                Brighter Tomorrow.
              </span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Limited seats for upcoming corporate cohorts. Register interest and Manasa will share dates,
              agenda, and pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openDemoModal('AI Finance Training')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                Register Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/library"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Browse Free Resource Library
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
