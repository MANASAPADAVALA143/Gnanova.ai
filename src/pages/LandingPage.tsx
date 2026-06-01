import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Target, CheckCircle2, ArrowRight, Play, Star, Users, BarChart3, Brain, Rocket, Shield, MessageCircle, Workflow } from 'lucide-react';

export const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: 'FinReportAI',
      description: 'IFRS 15 & 16 automation, journal entry anomaly detection, FP&A dashboards, and CFO-ready reports. Built for CA firms and finance teams.',
      color: 'from-[#667eea] to-[#764ba2]',
    },
    {
      icon: Workflow,
      title: 'InvoiceFlow',
      description: 'End-to-end AP automation with OCR, 3-way matching, GST compliance, and duplicate detection. Zero manual data entry.',
      color: 'from-[#f093fb] to-[#f5576c]',
    },
    {
      icon: Users,
      title: 'CPA OS',
      description: 'Practice management for CA firms. Automates client onboarding, document chasing via WhatsApp, and tax workflows.',
      color: 'from-[#4facfe] to-[#00f2fe]',
    },
    {
      icon: MessageCircle,
      title: 'ReceptAI',
      description: 'AI voice agents for dental, legal, HVAC, medical spa, chiropractic, veterinary, and orthodontics. Handles inbound calls and reactivation outreach 24/7.',
      color: 'from-[#43e97b] to-[#38f9d7]',
    },
    {
      icon: Shield,
      title: 'LegalMind AI',
      description: 'Contract review and legal research AI trained on UAE, DIFC, and Indian law. Flags risk clauses and generates structured legal summaries.',
      color: 'from-[#fa709a] to-[#fee140]',
    },
  ];

  const stats = [
    { value: '5', label: 'AI Products Live' },
    { value: '7', label: 'Industries Covered' },
    { value: '12+', label: 'Years Finance Expertise' },
    { value: '24/7', label: 'Voice AI Availability' },
  ];

  const benefits = [
    { icon: Users, title: 'Built by Finance Experts', description: 'Designed by a CMA with 12+ years at Barclays and HSBC. We understand the real problems, not just the tech.' },
    { icon: Brain, title: 'ML + AI, Not Just Prompting', description: "Our finance products use Isolation Forest, SHAP, and Benford's Law — not generic LLM outputs. Accurate, auditable, explainable." },
    { icon: Shield, title: 'CA Standards Compliant', description: 'Client data never leaves your system. Our privacy layer ensures ICAI compliance for every CA firm deployment.' },
    { icon: Workflow, title: 'Integration-First', description: 'Works on top of your existing ERP, Tally, Zoho, or Oracle setup. No rip-and-replace needed.' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto pl-2 pr-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#667eea] bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                Gnanova.pro
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Products</a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Who We Help</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#667eea]/30 transition-all"
              >
                Get Started
              </Link>
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
            <span className="text-sm text-gray-300">Finance · Legal · Healthcare AI</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slideUp">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Purpose-Built AI Products for
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#4facfe] bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Finance, Legal & Healthcare
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
            From IFRS reporting and journal entry anomaly detection to voice AI agents and legal automation — we build AI that solves real industry problems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/register"
              className="group px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-[#667eea]/40 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Explore Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center gap-2">
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
              Purpose-built AI for finance professionals, CA firms, and service businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2 cursor-pointer overflow-hidden"
                onMouseEnter={() => setActiveFeature(idx)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
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
              { role: 'CA Firm Partner', company: 'Hyderabad', rating: 5, text: 'Gnanova.pro deployed IFRS reporting automation and journal entry anomaly detection across our audit practice. We\'ve reclaimed countless hours and our close cycle went from weeks to days.' },
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
            <Link
              to="/register"
              className="group px-10 py-5 bg-white text-[#667eea] rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              Explore Products
            </button>
          </div>

          <p className="text-sm text-white/70 mt-8">Custom demos available for CA firms, CFOs, and legal practices</p>
        </div>
      </section>

      <footer id="contact" className="relative py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#667eea] bg-clip-text text-transparent">
                  Gnanova.pro
                </span>
              </div>
              <p className="text-sm text-gray-400 pl-[52px]">Built by Manasa Padavala · ACMA · Ex-AVP Barclays & HSBC</p>
            </div>

            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="text-sm text-gray-400">
              © 2025 Gnanova.pro. All rights reserved.
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
