import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Target, TrendingUp, CheckCircle2, ArrowRight, Play, Star, Users, Calendar, BarChart3, Brain, Rocket, Shield, Clock } from 'lucide-react';

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
      icon: Brain,
      title: 'AI Content Generation',
      description: 'Create engaging social media posts in seconds with our advanced AI technology',
      color: 'from-[#667eea] to-[#764ba2]',
    },
    {
      icon: Calendar,
      title: 'Multi-Platform Scheduling',
      description: 'Schedule and publish content across all major social platforms from one dashboard',
      color: 'from-[#f093fb] to-[#f5576c]',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track performance with real-time insights and detailed engagement metrics',
      color: 'from-[#4facfe] to-[#00f2fe]',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Posts Generated' },
    { value: '500+', label: 'Active Clients' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.8/5', label: 'User Rating' },
  ];

  const benefits = [
    { icon: Clock, title: 'Save 20+ Hours Weekly', description: 'Automate your content creation and scheduling' },
    { icon: TrendingUp, title: 'Boost Engagement by 3x', description: 'AI-optimized content that resonates with your audience' },
    { icon: Target, title: 'Brand Consistency', description: 'Maintain your unique voice across all platforms' },
    { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption and data protection' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#667eea] bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                Gnanova.ai
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefits</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
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
            <span className="text-sm text-gray-300">AI-Powered Marketing Automation</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-slideUp">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Create Content
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#4facfe] bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              10x Faster
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
            Generate engaging social media content with AI, schedule posts across all platforms, and grow your brand on autopilot.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slideUp" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/register"
              className="group px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-[#667eea]/40 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
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
              <span className="text-sm text-gray-300">Powerful Features</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#4facfe] bg-clip-text text-transparent">
                Dominate Social Media
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              All the tools you need to create, schedule, and analyze your content in one powerful platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                <span className="text-sm text-gray-300">Why Choose Us</span>
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Transform Your
                <br />
                <span className="bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent">
                  Social Media Game
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Join hundreds of businesses that have scaled their social media presence with Gnanova.ai
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
              Loved by
              <span className="bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent"> 500+ Businesses</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Marketing Director', company: 'TechCorp', rating: 5, text: 'Gnanova.ai has completely transformed how we manage our social media. We\'ve seen a 3x increase in engagement!' },
              { name: 'Michael Chen', role: 'Founder', company: 'StartupXYZ', rating: 5, text: 'The AI-generated content is incredibly accurate and saves us 20+ hours every week. Game changer!' },
              { name: 'Emma Williams', role: 'Social Media Manager', company: 'BrandCo', rating: 5, text: 'Best investment we\'ve made for our marketing stack. The ROI is undeniable.' },
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
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</div>
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
            Ready to 10x Your Content?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join 500+ businesses already using Gnanova.ai to dominate social media
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="group px-10 py-5 bg-white text-[#667eea] rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              Schedule Demo
            </button>
          </div>

          <p className="text-sm text-white/70 mt-8">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      <footer className="relative py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#667eea] bg-clip-text text-transparent">
                Gnanova.ai
              </span>
            </div>

            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="text-sm text-gray-400">
              © 2025 Gnanova.ai. All rights reserved.
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
