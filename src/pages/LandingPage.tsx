import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  FileText,
  GraduationCap,
  HeartPulse,
  MessageCircle,
  Play,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
  Wallet,
  Workflow,
  Zap,
} from 'lucide-react';
import { SiteNav } from '../components/SiteNav';
import { GnanovaLogo } from '../components/GnanovaLogo';
import { useDemoModal } from '../contexts/DemoModalContext';

const stats = [
  { value: '12+', label: 'Years Industry Expertise' },
  { value: '97-99%', label: 'AI Extraction Accuracy' },
  { value: 'Multi', label: 'Industry Deployments' },
  { value: 'E2E', label: 'End-to-End Automation' },
];

const problems = [
  'Staff buried in repetitive calls, messages, and follow-ups',
  'Manual paperwork and data entry slowing operations down',
  'Payments and collections chased manually instead of tracked automatically',
  "No real-time visibility into what's actually happening in your operations",
  'Hours lost every week to work a machine could do in seconds',
];

const capabilities = [
  {
    icon: Bot,
    title: 'AI Agents',
    description:
      'Autonomous voice and chat agents that handle calls, queries, follow-ups, and scheduling 24/7, without human intervention.',
    color: 'from-[#667eea] to-[#764ba2]',
  },
  {
    icon: Workflow,
    title: 'Agentic AI Workflows',
    description:
      'Multi-step automations where AI agents take action — collecting data, triggering reminders, updating records, and escalating when needed.',
    color: 'from-[#f093fb] to-[#f5576c]',
  },
  {
    icon: Rocket,
    title: 'End-to-End Enterprise Solutions',
    description:
      'From lead intake to reporting, we automate the full operational chain, not just isolated tasks.',
    color: 'from-[#4facfe] to-[#00f2fe]',
  },
  {
    icon: Zap,
    title: 'Business Process Automation',
    description:
      'Eliminate repetitive manual work across departments — front office, back office, and everything in between.',
    color: 'from-orange-500 to-amber-600',
  },
  {
    icon: Target,
    title: 'Sales Automation',
    description:
      'Automated lead follow-up, outreach sequencing, appointment booking, and pipeline tracking, so your sales team focuses on closing, not chasing.',
    color: 'from-[#a855f7] to-[#ec4899]',
  },
  {
    icon: FileText,
    title: 'Document Automation (OCR)',
    description:
      'Extract and structure data from forms, invoices, and paperwork automatically.',
    color: 'from-[#43e97b] to-[#38f9d7]',
  },
  {
    icon: Wallet,
    title: 'Payment & Collection Automation',
    description: 'Automated reminders, reconciliation, and real-time tracking.',
    color: 'from-[#667eea] to-[#4facfe]',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Dashboards',
    description: 'Live visibility into operations without manual reporting.',
    color: 'from-[#f093fb] to-[#764ba2]',
  },
];

const industries = [
  {
    title: 'Finance & CA Firms',
    teaser: 'IFRS compliance, AP automation, and real-time CFO dashboards.',
    to: '/finance',
    icon: BarChart3,
    color: 'from-orange-500 to-amber-600',
    comingSoon: false,
  },
  {
    title: 'Schools',
    teaser: 'Fee automation, parent communication, and admin workflows — end to end.',
    to: '/schools',
    icon: GraduationCap,
    color: 'from-[#667eea] to-[#764ba2]',
    comingSoon: false,
  },
  {
    title: 'Healthcare',
    teaser: 'Patient scheduling, billing, and operations automation — launching soon.',
    to: '/healthcare',
    icon: HeartPulse,
    color: 'from-rose-500 to-pink-600',
    comingSoon: true,
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Built by Industry Experts, Not Generic Developers',
    description:
      'Designed by practitioners with deep domain experience. We understand real operational problems, not just the tech.',
  },
  {
    icon: Brain,
    title: 'Real AI/ML, Not Just Prompting',
    description:
      "Where it matters, we use Isolation Forest, SHAP, and Benford's Law — accurate, auditable, and explainable — not generic LLM outputs alone.",
  },
  {
    icon: Shield,
    title: 'Data Privacy & Compliance Built In',
    description:
      'Client data stays controlled. Privacy and compliance patterns are designed into every deployment.',
  },
  {
    icon: Workflow,
    title: 'Integration-First — Works With What You Already Use',
    description:
      'Works on top of your existing systems. No rip-and-replace required to start automating.',
  },
];

const testimonials = [
  {
    role: 'CA Firm Partner',
    company: 'Hyderabad',
    rating: 5,
    text: "Gnanova AI deployed IFRS reporting automation and journal entry anomaly detection across our audit practice. We've reclaimed countless hours and our close cycle went from weeks to days.",
  },
  {
    role: 'CFO',
    company: 'Manufacturing Company',
    rating: 5,
    text: 'Their FinReportAI FP&A dashboards and anomaly detection delivered measurable ROI in just 3 months. Accurate, auditable, and built for how finance teams actually work.',
  },
  {
    role: 'Managing Partner',
    company: 'Law Firm',
    rating: 5,
    text: 'LegalMind AI and ReceptAI eliminated 100+ hours of manual contract review and client intake monthly. This is what true digital transformation looks like for legal practices.',
  },
];

export const LandingPage = () => {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <SiteNav variant="fixed" />

      <section className="relative min-h-screen flex items-center justify-center pt-28 lg:pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#667eea]/20 rounded-full blur-[128px] animate-pulse-slow" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#f093fb]/20 rounded-full blur-[128px] animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#4facfe]/20 rounded-full blur-[128px] animate-pulse-slow"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-[#667eea]" />
            <span className="text-xs text-gray-300">Agentic AI · Automation Agency</span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Gnanova AI — Agentic AI Automation for Every Business
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto">
            We build end-to-end AI automation — from sales and customer communication to back-office
            operations — so your team spends less time on repetitive work and more time on what
            actually grows the business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#solutions"
              className="group px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-[#667eea]/40 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Explore Solutions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              type="button"
              onClick={() => openDemoModal()}
              className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Book a Demo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="problem" className="relative py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
              <Target className="w-4 h-4 text-[#f093fb]" />
              <span className="text-sm text-gray-300">The Problem We Solve</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Operations stuck in manual loops</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The same patterns show up across industries — people doing work machines should own.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {problems.map((problem) => (
              <div
                key={problem}
                className="flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-5 text-gray-300"
              >
                <CheckCircle2 className="w-5 h-5 text-[#667eea] shrink-0 mt-0.5" />
                <span className="text-sm">{problem}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="relative py-24 px-6 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
              <Zap className="w-4 h-4 text-[#4facfe]" />
              <span className="text-sm text-gray-300">How We Fix It</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Agentic AI that takes action
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Not chatbots bolted onto broken processes — end-to-end automation across the business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((item) => (
              <div
                key={item.title}
                className="group relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 hover:border-white/20 hover:-translate-y-1 transition-all overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <div className="relative">
                  <div className={`inline-flex p-3 bg-gradient-to-br ${item.color} rounded-2xl mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
              <MessageCircle className="w-4 h-4 text-[#667eea]" />
              <span className="text-sm text-gray-300">Solutions By Industry</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore How We Apply This to Your World
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {industries.map((industry) => {
              const CardInner = (
                <>
                  {industry.comingSoon && (
                    <span className="absolute top-6 right-6 px-2.5 py-1 text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
                      Coming Soon
                    </span>
                  )}
                  <div className={`inline-flex p-4 bg-gradient-to-br ${industry.color} rounded-2xl mb-6`}>
                    <industry.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{industry.title}</h3>
                  <p className="text-gray-400 mb-6">{industry.teaser}</p>
                  {!industry.comingSoon && (
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#667eea]">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </>
              );

              const className =
                'group relative bg-white/5 border border-white/10 rounded-3xl p-8 transition-all overflow-hidden ' +
                (industry.comingSoon
                  ? 'opacity-80 cursor-default'
                  : 'hover:bg-white/10 hover:-translate-y-2 hover:border-white/20');

              return industry.comingSoon ? (
                <div key={industry.title} className={className}>
                  {CardInner}
                </div>
              ) : (
                <Link key={industry.title} to={industry.to} className={className}>
                  {CardInner}
                </Link>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Healthcare waitlist:{' '}
            <Link to="/healthcare" className="text-[#667eea] hover:underline">
              gnanova.pro/healthcare
            </Link>
          </p>
        </div>
      </section>

      <section id="benefits" className="relative py-24 px-6 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
                <Shield className="w-4 h-4 text-[#4facfe]" />
                <span className="text-sm text-gray-300">Why Gnanova</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Experience AI That
                <br />
                <span className="bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                  Actually Delivers ROI
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Join forward-thinking organizations leveraging AI automation to unlock capacity and
                growth.
              </p>
              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-4 group">
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
              <div className="absolute inset-0 bg-gradient-to-br from-[#667eea]/20 to-[#f093fb]/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#667eea] to-[#f093fb] rounded-full"
                          style={{ width: '80%' }}
                        />
                      </div>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full mb-2" />
                    <div className="h-2 bg-white/5 rounded-full w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
              <Star className="w-4 h-4 text-[#f093fb]" />
              <span className="text-sm text-gray-300">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by
              <span className="bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                {' '}
                Visionary Leaders
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.role}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2"
              >
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

      <section className="relative py-24 px-6 bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        <div className="relative max-w-4xl mx-auto text-center">
          <Rocket className="w-16 h-16 text-white mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to See It Live?</h2>
          <p className="text-xl text-white/90 mb-12">
            Book a demo on your actual data — Finance, Schools, or any other workflow you want
            automated.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openDemoModal()}
              className="group px-10 py-5 bg-white text-[#667eea] rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#solutions"
              className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Explore Solutions
            </a>
          </div>
        </div>
      </section>

      <footer className="relative py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-2">
              <GnanovaLogo height={36} linkTo="" />
              <p className="text-sm text-gray-400">Gnanova AI — Agentic AI Automation Agency</p>
              <p className="text-sm text-gray-400">
                Built by Manasa Padavala · ACCA · Ex-AVP Barclays &amp; HSBC
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link to="/finance" className="hover:text-white transition-colors">
                Finance
              </Link>
              <Link to="/schools" className="hover:text-white transition-colors">
                Schools
              </Link>
              <Link to="/healthcare" className="hover:text-white transition-colors">
                Healthcare
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <div className="text-sm text-gray-400 text-center md:text-right max-w-xs">
              © 2026 Gnanova Pro AI Technologies Private Limited. All rights reserved. | CIN:
              U62099TS2026PTC221233
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
